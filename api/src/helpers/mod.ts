export const loadDynamically = async (filepath: string) => {
    try {
       return await import(filepath);
    } catch (error) {
        console.error(`Error importing module for '${filepath}':`, error);
    }
};
