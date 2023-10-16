import bcrypt from "bcrypt";

const saltRounds = 10; // The number of salt rounds determines the computational cost (10-12 is a good balance between security and performance)

// Arrow function to hash a text
const hashText = async (text: string): Promise<string> =>
    new Promise((resolve, reject) => {
        bcrypt.hash(text, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });

// Arrow function to compare a hash with a normal text
const compareHashToText = async (hash: string, text: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
        bcrypt.compare(text, hash, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

// Usage example:
const originalText = "myPassword";

// Hash the text
hashText(originalText)
    .then((hashedText) => {
        console.log("Hashed Text:", hashedText);

        // Compare a normal text to the hash
        const loginAttempt = "myPassword";
        compareHashToText(hashedText, loginAttempt)
            .then((result) => {
                if (result) {
                    console.log("Password is correct");
                } else {
                    console.log("Password is incorrect");
                }
            })
            .catch((error) => {
                console.error("Error comparing passwords:", error);
            });
    })
    .catch((error) => {
        console.error("Error hashing password:", error);
    });
