export interface Game {
    gid: number
    name: string
}

export interface Games {
    games: Game[]
    offset: number
    limit: number
}