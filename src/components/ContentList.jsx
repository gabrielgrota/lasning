import React from "react"
import '../styles/ContentList.css'

export default function ContentList({ documents }) {
    return (
        <div className="content-list">
            <h2>Dados cadastrados:</h2>
            {/* <pre>{JSON.stringify(documents, null, 2)}</pre> */}


            <div className="content-items">
                {documents.map((doc) => (
                    <div className="content-card" key={doc.id}>
                        <div className="image-container">
                            {doc.cover && <img src={doc.cover} alt={`${doc.title} cover`} className="content-cover" />}
                            <h3 className="image-title">{doc.title}</h3>
                        </div>

                        {/* Exibição condicional de acordo com o tipo de conteúdo */}
                        {doc.content === "book" && (
                            <div>
                                <p><strong>Author:</strong> {doc.author || "N/A"}</p>
                                <p><strong>Year:</strong> {doc.year && doc.year.substring(0, 4)}</p>
                                <p><strong>Type:</strong> {doc.type || "N/A"}</p>
                                <p><strong>Started:</strong> {doc.dateStarted}</p>
                                <p><strong>Finished:</strong> {doc.dateFinished}</p>
                                <p><strong>Rating:</strong> {doc.rating}</p>
                                <p><strong>Review:</strong> {doc.resume}</p>
                            </div>
                        )}

                        {doc.content === "movie" && (
                            <div>
                                <p><strong>Director:</strong> {doc.director || "N/A"}</p>
                                <p><strong>Release Year:</strong> {doc.year}</p>
                                <p><strong>Watched:</strong> {doc.dateWatched || "N/A"}</p>
                                <p><strong>Rating:</strong> {doc.rating}</p>
                                <p><strong>Review:</strong> {doc.review}</p>
                            </div>
                        )}

                        {doc.content === "series" && (
                            <div>
                                <p><strong>Release Year:</strong> {doc.year}</p>
                                <p><strong>Rating:</strong> {doc.rating}</p>
                                <p><strong>Review:</strong> {doc.review}</p>
                            </div>
                        )}

                        {doc.content === "podcast" && (
                            <div>
                                <p><strong>Author:</strong> {doc.author || "N/A"}</p>
                                <p><strong>Listened:</strong> {doc.dateListened}</p>
                                <p><strong>Rating:</strong> {doc.rating}</p>
                                <p><strong>Review:</strong> {doc.review}</p>
                                <a href={doc.link} target="_blank" rel="noopener noreferrer">Link</a>
                            </div>
                        )}

                        {doc.content === "youtubeVideo" && (
                            <div>
                                <p><strong>Author:</strong> {doc.author || "N/A"}</p>
                                <p><strong>Watched:</strong> {doc.dateWatched || "N/A"}</p>
                                <p><strong>Rating:</strong> {doc.rating}</p>
                                <p><strong>Review:</strong> {doc.review}</p>
                                <a href={doc.link} target="_blank" rel="noopener noreferrer">Link</a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}