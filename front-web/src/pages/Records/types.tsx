export type RecordsResponse = {
    content: RecordItem[];
    totalPages: number;
};

export type RecordItem = {
    id: number;
    moment: string;
    name: string;
    age: number;
    gameTitle: string;
    gamePlatform: PlartForm; 
    genreName: string;
}

export type PlartForm = 'XBOX ' | 'PC' | 'PLAYSTATITON';