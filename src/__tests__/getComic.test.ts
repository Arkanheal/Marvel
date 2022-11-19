import { CharacterComic, getComic, RequestError } from "../request";
import { mockFetch } from "./utils";

describe("#getComicValid", () => {
    let data: CharacterComic;

    beforeEach(async () => {
        mockFetch("getComicValid");
        data = await getComic(1009175) as CharacterComic;
    });

    it("should return 20 characters", () => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(data).toBeDefined();
        expect(data).toHaveProperty('count');

        expect(data.count).toEqual(820);
        expect(data.titles).toHaveLength(3);
        expect(data.titles[0]).toEqual("X-Treme X-Men Vol. 6: Intifada (2004)")
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});

describe("#getComicError", () => {
    let data: RequestError;

    beforeEach(async () => {
        mockFetch("getComicError");
        data = await getComic(1009175) as RequestError;
    });

    it("should return an Error", () => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(data).toBeDefined();
        expect(data).toHaveProperty("code");
        expect(data).toHaveProperty("error");
        expect(data.code).toEqual(409);
        expect(data.error).toEqual(
            "You must pass an integer limit greater than 0.",
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
