/**
 * @owner BlueSky
 * @description Define File handler for APP
 * @since 1.0.0
 * @date Sep 08, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import fs from 'fs';
import { platform } from 'os';
import { basename, parse, join } from 'path';
import { createHash, BinaryToTextEncoding } from 'crypto';

export default class FileHandler {
    private static parsePath(path: string): string {
        const regex = /(\\|\/)+/g;
        if (platform() === "win32") {
            return path.replace(regex, "\\\\");
        }
        return path.replace(regex, "/");
    }

    static fileName(filePath: string) {
        if (this.exist(filePath)) {
            return basename(this.parsePath(filePath));
        }
        return "";
    }

    static createDir(path: string) {
        if (!FileHandler.exist(path)) {
            fs.mkdirSync(path);
        }
    }

    static isRisky(filePath: string): boolean {
        const RISK_EXT = ['EXE'];
        let ext = parse(filePath).ext;
        if (ext) {
            ext = ext.substr(1).toUpperCase();
        }
        return RISK_EXT.indexOf(ext) >= 0;
    }

    static exist(path: string) {
        return fs.existsSync(this.parsePath(path)) ? fs.realpathSync(this.parsePath(path)) : false;
    }

    static retrieveFilesInDir(dirPath: string) {
        return fs.readdirSync(this.parsePath(dirPath));
    }

    static hash(filePath: string, algorithm: string, encoding: BinaryToTextEncoding = "hex"): Promise<string> {
        return new Promise(resolve => {
            const fStream = fs.createReadStream(this.parsePath(filePath));
            const objHash = createHash(algorithm);
            fStream.on("data", (data) => {
                objHash.update(data);
            });
            fStream.on("end", () => {
                resolve(objHash.digest(encoding));
            });
        });
    }

    static move(src: string, dest: string, removable: boolean) {
        const pathInfo = parse(dest);
        FileHandler.createDir(pathInfo.dir);
        fs.copyFileSync(src, dest);
        if (removable) FileHandler.remove(src);
    }

    static remove(path: string) {
        if (FileHandler.exist(path)) fs.unlinkSync(this.parsePath(path));
    }

    static removeAllFile(dirPath: string) {
        try {
            const files = fs.readdirSync(dirPath);
            if (files.length > 0)
                for (let i = 0; i < files.length; i++) {
                    const _path = dirPath + '/' + files[i];
                    if (fs.statSync(_path).isFile())
                        fs.unlinkSync(_path);
                    else
                        FileHandler.removeAllFile(_path);
                }
            fs.rmdirSync(dirPath);
        } catch (e) {
            return;
        }
    }

    static readFileSyncRecursive(path: string) {
        let list = []
            , files = fs.readdirSync(path)
            , stats: fs.Stats;
        files.forEach(file => {
            stats = fs.lstatSync(join(path, file));
            if (stats.isDirectory()) {
                list = list.concat(FileHandler.readFileSyncRecursive(join(path, file)));
            } else {
                list.push(join(path, file));
            }
        });
        return list;
    }

    static readFileSync(filePath: string, option?: any) {
        if (FileHandler.exist(filePath)) {
            return fs.readFileSync(this.parsePath(filePath), option || {});
        }
        return null;
    }

    static createReadStream(filePath: string, option?: any) {
        if (FileHandler.exist(filePath)) {
            return fs.createReadStream(this.parsePath(filePath), option || {});
        }
        return null;
    }

    static createWriteStream(filePath: string, option?: any) {
        return fs.createWriteStream(this.parsePath(filePath), option || {});
    }

    static writeFile(filePath: string, content: string, option?: any) {
        return fs.writeFile(filePath, content, option || {});
    }

    static writeFileSync(filePath: string, content: string) {
        fs.writeFileSync(filePath, content);
    }
}
