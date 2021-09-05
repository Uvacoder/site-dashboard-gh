import { Content, LikePerDate } from '@/types/content';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export async function getAllFiles() {
  const files = readdirSync(join(process.cwd(), 'src', 'data'));

  return files.reduce((allContents: LikePerDate[], fileName) => {
    const source = readFileSync(
      join(process.cwd(), 'src', 'data', fileName),
      'utf8'
    );

    const { data }: { data: Array<Content> } = JSON.parse(source);

    const mappedData = data.map((d) => ({
      ...d,
      likesByUser: Object.keys(d.likesByUser).length,
    }));

    return [
      {
        date: fileName.replace('.json', ''),
        data: mappedData,
      },
      ...allContents,
    ];
  }, []);
}
