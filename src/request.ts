// Imports
import { Md5 } from "ts-md5";

// Globals setup
const base_url: string = "https://gateway.marvel.com:443/v1/public/";
const API_KEY: string = process.env.API_KEY!;
const API_PRIVATE_KEY: string = process.env.API_PRIVATE_KEY!;

function getURL(endpoint: string, params?: Map<string, any>): string {
    const ts: string = Date.now().toString();

    // Création du hash
    const hash = Md5.hashStr(ts + API_PRIVATE_KEY + API_KEY);

    let url_no_param: string =
        base_url +
        endpoint +
        "?ts=" +
        ts +
        "&apikey=" +
        API_KEY +
        "&hash=" +
        hash;

    // Construction de l'URL
    if (params) {
        for (let [key, val] of params.entries()) {
            url_no_param += "&" + key + "=" + val;
        }
    }

    return url_no_param;
}

export type Character = {
    id: number;
    name: string;
    description: string;
    pic: string;
};

export type CharacterComic = {
    count: number;
    titles: string[];
};

export type RequestError = {
    code: number;
    error: string;
};

export async function getCharacters(
    offset: number,
): Promise<Character[] | RequestError> {
    // Set parameters
    let params: Map<string, any> = new Map();
    params.set("offset", offset);
    params.set("limit", 20);

    // Get URL
    let final_url = getURL("characters", params);

    // Send request
    const res = await fetch(final_url);
    const data = await res.json();

    if (data.code >= 400) {
        return { code: data.code, error: data.status };
    }

    // Parse request
    let returnObj: Character[] = [];

    const charList = data.data.results;

    for (let i = 0; i < charList.length; ++i) {
        const currChar = charList[i]!;
        returnObj.push({
            id: currChar.id,
            name: currChar.name,
            description: currChar.description,
            pic: currChar.thumbnail.path + "." + currChar.thumbnail.extension,
        });
    }

    return returnObj;
}

export async function getComic(
    id: number,
): Promise<CharacterComic | RequestError> {
    // Set parameters
    let params: Map<string, any> = new Map();
    params.set("orderBy", "onsaleDate");
    params.set("limit", 3);

    // Get URL
    let final_url = getURL(`characters/${id}/comics`, params);

    // Send request
    const res = await fetch(final_url);
    const data = await res.json();

    if (data.code >= 400) {
        return { code: data.code, error: data.status };
    }

    let returnObj: CharacterComic = { count: 0, titles: [] };
    returnObj["count"] = data.data.total;

    let returnArr: string[] = [];

    const comicInfo = data.data.results;

    for (let i = 0; i < comicInfo.length; ++i) {
        const currComic = comicInfo[i]!;
        returnArr.push(currComic.title);
    }

    returnObj["titles"] = returnArr;

    return returnObj;
}
