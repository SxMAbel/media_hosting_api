import fs from "fs";
import { resolve } from "path";
import writeFileAtomic from "write-file-atomic";

// Defines the types element values can be.
type JSONValue =
  | string
  | number
  | boolean
  | { [key: string]: JSONValue }
  | JSONValue[]
  | null;

class Jsoning {
  private database: string;

  /**
   * Create a new JSON file for storing or initialize an existing file to be used.
   *
   * @param database Path to the JSON file to be created or used.
   * @returns Returns true if the JSON file was successfully initialized.
   *
   * @example
   * let database = new Jsoning("database.json");
   * let database = new Jsoning("../path/to/database.json");
   */
  constructor(database: string) {
    if (!/\w+.json/.test(database)) {
      throw new TypeError(
        "Invalid database file name. Make sure to provide a valid JSON database filename."
      );
    }

    const dbPath = resolve(process.cwd(), database);
    if (fs.existsSync(dbPath)) {
      this.database = database;
    } else {
      fs.writeFileSync(dbPath, "{}");
      this.database = database;
    }
  }

  /**
   * Adds an element to the database with the given value. If element with the given key exists, element value is updated.
   *
   * @param key Key of the element to be set.
   * @param value Value of the element to be set.
   * @returns If element is set/updated successfully, returns true; else false.
   *
   * @example
   * database.set("foo", "bar");
   */
  async set(key: string, value: JSONValue): Promise<boolean> {
    if (typeof key !== "string" || key === "") {
      throw new TypeError("Invalid key/value for element");
    }

    const dbPath = resolve(process.cwd(), this.database);
    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    db[key] = value;

    try {
      await writeFileAtomic(dbPath, JSON.stringify(db));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  /**
   * Returns all the elements and their values of the JSON file.
   *
   * @returns All the key-value pairs of the database.
   *
   * @example
   * let all = database.all();
   */
  all(): { [key: string]: JSONValue } {
    const data = fs.readFileSync(
      resolve(process.cwd(), this.database),
      "utf-8"
    );
    return JSON.parse(data);
  }

  /**
   * Deletes an element from the database based on its key.
   *
   * @param key The key of the element to be deleted.
   * @returns Returns true if the value exists, else returns false.
   *
   * @example
   * database.delete("foo");
   */
  async delete(key: string): Promise<boolean> {
    if (typeof key !== "string" || key === "") {
      throw new TypeError("Invalid key of element");
    }

    const dbPath = resolve(process.cwd(), this.database);
    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    if (Object.prototype.hasOwnProperty.call(db, key)) {
      try {
        const { [key]: _, ...rest } = db;
        await writeFileAtomic(dbPath, JSON.stringify(rest));
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Returns the value of an element by key.
   *
   * @param key The key of the element to be fetched.
   * @returns Returns value, if element exists, else returns null.
   *
   * @example
   * let food = database.get("food");
   */
  get(key: string): JSONValue | null {
    if (typeof key !== "string" || key === "") {
      throw new TypeError("Invalid key of element");
    }

    const db = JSON.parse(
      fs.readFileSync(resolve(process.cwd(), this.database), "utf-8")
    );
    return Object.prototype.hasOwnProperty.call(db, key) ? db[key] : null;
  }

  /**
   * Deletes the contents of the JSON file.
   *
   * @returns True if the operation succeeded, else false.
   *
   * @example
   * database.clear();
   */
  async clear(): Promise<boolean> {
    try {
      await writeFileAtomic(
        resolve(process.cwd(), this.database),
        JSON.stringify({})
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  /**
   * Performs basic mathematical operations on values of elements.
   *
   * @param key The key of the element on which the mathematical operation is to be performed.
   * @param operation The operation to perform, one of add, subtract, multiply, and divide.
   * @param operand The number for performing the mathematical operation (the operand).
   *
   * @returns True if the operation succeeded, else false.
   *
   * @example
   * database.math("value1", "add", 1);
   */
  async math(
    key: string,
    operation: string,
    operand: number
  ): Promise<boolean> {
    if (typeof key !== "string" || key === "") {
      throw new TypeError("Invalid key of element");
    }

    if (typeof operation !== "string" || operation === "") {
      throw new TypeError("Invalid Jsoning#math operation.");
    }

    if (typeof operand !== "number") {
      throw new TypeError("Operand must be a number type!");
    }

    const dbPath = resolve(process.cwd(), this.database);
    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    if (Object.prototype.hasOwnProperty.call(db, key)) {
      let value = db[key];
      if (typeof value !== "number") {
        throw new Error(
          "Key of existing element must be a number for Jsoning#math to happen."
        );
      }

      let result;
      switch (operation) {
        case "add":
        case "addition":
          result = value + operand;
          break;
        case "subtract":
        case "subtraction":
          result = value - operand;
          break;
        case "multiply":
        case "multiplication":
          result = value * operand;
          break;
        case "divide":
        case "division":
          result = value / operand;
          break;
        default:
          throw new Error("Operation not found!");
      }

      db[key] = result;
      try {
        await writeFileAtomic(dbPath, JSON.stringify(db));
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Check if a particular element exists by key.
   *
   * @param key The key of the element to see if the element exists.
   *
   * @returns True if the element exists, false if the element doesn't exist.
   *
   * @example
   * let has = database.has("some value");
   */
  has(key: string): boolean {
    if (typeof key !== "string" || key === "") {
      throw new TypeError("Invalid key of element");
    }

    const db = JSON.parse(
      fs.readFileSync(resolve(process.cwd(), this.database), "utf-8")
    );
    return Object.prototype.hasOwnProperty.call(db, key);
  }

  /**
   * Adds the given value into the provided element (if it's an array) in the database based on the key. If no such element exists, it will initialize a new element with an empty array.
   *
   * @param key The key of the element.
   * @param value The value to be added to the element array.
   *
   * @returns True if the value was pushed to an array successfully, else false.
   *
   * @example
   * database.push("leaderboard", "khaleel");
   */
  async push(key: string, value: JSONValue): Promise<boolean> {
    const dbPath = resolve(process.cwd(), this.database);
    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    if (Object.prototype.hasOwnProperty.call(db, key)) {
      if (!Array.isArray(db[key])) {
        if (db[key] !== undefined && db[key] !== null) {
          throw new TypeError(
            "Existing element must be of type Array for Jsoning#push to work."
          );
        } else {
          db[key] = [];
          db[key].push(value);
          try {
            await writeFileAtomic(dbPath, JSON.stringify(db));
            return true;
          } catch (err) {
            console.error(err);
            return false;
          }
        }
      } else {
        db[key].push(value);
        try {
          await writeFileAtomic(dbPath, JSON.stringify(db));
          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      }
    } else {
      db[key] = [];
      db[key].push(value);
      try {
        await writeFileAtomic(dbPath, JSON.stringify(db));
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }

  /**
   * Removes a given primitive value from an array in the database based on the key. If no existing array, it will do nothing.
   *
   * @param key The key of the element.
   * @param value The value to be removed from the element array.
   *
   * @returns True if successfully removed or not found or the key does not exist, else false.
   *
   * @example
   * database.remove("leaderboard", "wh0");
   */
  async remove(key: string, value: JSONValue): Promise<boolean> {
    const dbPath = resolve(process.cwd(), this.database);
    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    if (!Object.prototype.hasOwnProperty.call(db, key)) {
      return true;
    }
    if (!Array.isArray(db[key])) {
      console.error(
        "Existing element must be of type Array for Jsoning#remove to work."
      );
      return false;
    }
    db[key] = db[key].filter((item: JSONValue) => item !== value);

    try {
      await writeFileAtomic(dbPath, JSON.stringify(db));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export default Jsoning;
