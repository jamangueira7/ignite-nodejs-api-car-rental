import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import csvParse from 'csv-parse';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {


    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository
    ) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);

            const categories: IImportCategory[] = [];

            const parserFile = csvParse();

            stream.pipe(parserFile);

            parserFile.on('data', async (line) => {
                const [name, description] = line;

                categories.push({
                    name,
                    description,
                });
            }).on('end', () => {
                fs.promises.unlink(file.path);

                resolve(categories);
            }).on('error', (err) => {
                reject(err);
            });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map( async (category) => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findbyName(name);

            if(!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description
                });
            }
        })
    }
}

export { ImportCategoryUseCase };
