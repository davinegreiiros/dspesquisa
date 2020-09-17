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
    gamePlatform: Plartform; 
    genreName: string;
}

export type Plartform = 'XBOX ' | 'PC' | 'PLAYSTATITON';