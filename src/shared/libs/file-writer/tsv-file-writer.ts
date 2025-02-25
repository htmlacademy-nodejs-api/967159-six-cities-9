import { WriteStream, createWriteStream } from 'node:fs';
import { FileWriter } from './file-writer.interface.js';
import { LINEBREAK } from '../../../const.js';

export class TSVFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor (filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public async write (row: string): Promise<unknown> {
    const writeSuccess = this.stream.write(`${row}${LINEBREAK}`);
    if (!writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}
