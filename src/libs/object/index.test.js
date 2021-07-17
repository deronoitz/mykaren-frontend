import { getSafely, previewImage, reselect } from "./index";

import { MockFile } from "src/helpers/test";

describe("Helper: Object", () => {
  describe("Method: getSafely", () => {
    const obj = {
      one: "1",
      two: "2",
      three: {
        four: "4",
        five: "5"
      },
      six: null
    };

    it("Should return null if object is null or undefined", () => {
      expect(getSafely(["one", "two"])).toEqual(null);
      expect(getSafely(["one", "two"], null)).toEqual(null);
    });

    it("Should return undefined if keys given are not defined in the object", () => {
      expect(getSafely(["one", "two"], obj)).toEqual(undefined);
      expect(getSafely(["three", "four", "six"], obj)).toEqual(undefined);
    });

    it("Should return correct value of the object", () => {
      expect(getSafely(["one"], obj)).toEqual("1");
      expect(getSafely(["three"], obj)).toEqual({ four: "4", five: "5" });
      expect(getSafely(["three", "four"], obj)).toEqual("4");
      expect(getSafely(["six"], obj)).toEqual(null);
    });
  });

  describe("Method: previewImage", () => {
    it("Should call the callback function once", (done) => {
      const mockFile = new MockFile();
      const file = mockFile.create("pic.jpg", 1024, "image/jpeg");
      const callbackFn = jest.fn();

      previewImage(file, callbackFn);

      setTimeout(() => {
        expect(callbackFn).toBeCalledTimes(1);
        done();
      }, 100);
    });
  });

  describe("Method: reselect", () => {
    const options = [
      { value: 1, label: "satu" },
      { value: 2, label: "dua" },
      { value: 3, label: "tiga" }
    ];

    it("Should return the correct option (single type selected)", () => {
      const selected = { value: 1, label: "one" };
      expect(reselect(selected, options)).toEqual({ value: 1, label: "satu" });
    });

    it("Should return the correct options (multi type selected)", () => {
      const selected = [
        { value: 1, label: "one" },
        { value: 3, label: "three" }
      ];
      expect(reselect(selected, options)).toEqual([
        { value: 1, label: "satu" },
        { value: 3, label: "tiga" }
      ]);
    });
  });
});
