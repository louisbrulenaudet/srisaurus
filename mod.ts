/**
 *  Required. Specifies the hash algorithm for files in the specified path.
 * The supported algorithms are SHA-256, SHA-384 and SHA-512 respectively.
 */
// const hash = String

import { crypto } from "crypto";
import { join, extname } from "path";

export class Srisaurus {
	algorithm: string;
	hash: [];

	constructor(algorithm: string) {
		this.algorithm = algorithm;
		this.hash = [];
	}

	async isNotBackgroundFile(file: string): Promise<boolean> {
		/**
		 *  Required. Path to file to be hashed.
		 *  Boolean, true if extname is .css or .js, false if not.
		 */
		// const file = String
		if (extname(file) === ".css" || extname(file) === ".js") {
			return true;
		} else {
			return false;
		}
	}

	async generateSHA({ absoluteFilepath }: { absoluteFilepath: string }): Promise<string> {
		/**
		 *  Required. absoluteFilepath to file to be hashed.
		 *  Decodes the content of the file to be hashed, then applies the
		 *  cryptographic algorithm on the textual content and returns a Base64 print.
		 */
		// const absoluteFilepath = String
		const data = Deno.readFileSync(absoluteFilepath);

		// Decode file body.
		const decoder = new TextDecoder("utf-8");
		const body: string = decoder.decode(data).toString();
		const textAsBuffer = new TextEncoder().encode(body);

		// Apply crypto algorithm.
		const hashBuffer = await crypto.subtle.digest(this.algorithm, textAsBuffer);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashBase64 = hashArray.map((item) => item.toString(16).padStart(2, "0")).join("");

		return this.algorithm.replace("-", "").toLowerCase() + "-" + hashBase64;
	}

	async get(filepath: string): Promise<[]> {
		/**
		 *  Required. Path to static resources to be hashed before distribution.
		 *  Checks the validity of the encryption algorithm and explores the static resource
		 *  folder to isolate and generate a unique fingerprint for each file.
		 */
		// const filepath = String
		if (this.algorithm == "SHA-256" || this.algorithm == "SHA-384" || this.algorithm == "SHA-512") {
			const filesInDirectory = Deno.readDirSync(filepath);

			for (const file of filesInDirectory) {
				const absoluteFilepath = join(filepath, file.name);
				if (file.isDirectory) {
					await this.get(absoluteFilepath);
				} else if (await this.isNotBackgroundFile(file.name)) {
					const newHash = {
						filepath: absoluteFilepath,
						hash: await this.generateSHA({ absoluteFilepath }),
					};
					this.hash.push(newHash);
				}
			}
		} else {
			throw new Error(
				"Incorrect algorithm, please select a value supported by browsers for sub-resource integrity checking ('SHA-256', 'SHA-384', 'SHA-512')."
			);
		}
		return this.hash;
	}
}
