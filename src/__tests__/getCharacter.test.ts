import { Character, getCharacters, RequestError } from "../request";
import { mockFetch } from "./utils";

describe("#getCharactersValid", () => {
    let data: Character[];

    beforeEach(async () => {
        mockFetch("getCharactersValid");
        data = (await getCharacters(100)) as Character[];
    });

    it("should return 20 characters", () => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(data).toBeDefined();
        expect(data).toHaveLength(20);

        expect(data[0].id).toEqual(1009175);
        expect(data[19].name).toEqual("Big Bertha");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});

describe("#getCharactersError", () => {
    let data: RequestError;

    beforeEach(async () => {
        mockFetch("getCharactersError");
        data = (await getCharacters(100)) as RequestError;
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
