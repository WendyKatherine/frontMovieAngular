export class Movie {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public duration: string,
        public category: string,
        public trailer: string,
        public releasedate: number,
        public image: string
    ){}
}