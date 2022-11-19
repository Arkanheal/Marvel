import { readFileSync } from "fs";
import path = require("path");

export function mockFetch(fileName: string) {
    global.fetch = jest.fn(async () =>
        Promise.resolve({
            json: () =>
                Promise.resolve(
                    JSON.parse(
                        readFileSync(
                            path.join(
                                __dirname,
                                `../__mocks__/${fileName}.json`,
                            ),
                            "utf-8",
                        ),
                    ),
                ),
        }),
    ) as jest.Mock;
}
