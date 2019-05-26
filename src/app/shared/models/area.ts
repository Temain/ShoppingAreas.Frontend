import { FileEntity } from './file-entity';

export class Area {
  id: number;
  name: string;
  address: string;
  totalArea: number;
  imagePath: string;

  image: FileEntity;
}
