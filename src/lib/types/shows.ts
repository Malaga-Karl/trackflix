export default interface Show {
    id: number,
    name: string,
    season: number,
    seasons: number,
    episode: number,
    episodes: number,
    posterUrl?: string,
    title?: string    // for backwards compatibility
}