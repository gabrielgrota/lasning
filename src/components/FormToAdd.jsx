import React, { useEffect, useState } from "react";
import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import ContentList from "./ContentList";
import '../styles/FormToAdd.css'

export default function FormToAdd(){
    const [formData, setFormData] = useState({
        content: "",

        book: {
            title: "",
            author: "",
            year: "",
            type: "",
            dateStarted: "",
            dateFinished: "",
            rating: "",
            resume: "",
            cover: ""
        },

        movie: {    
            title: "",
            director: "",
            genre: "",
            releaseYear: "",
            dateWatched: "",
            rating: "",
            review: "",
            cover: ""
        },

        series: {    
            title: "",
            director: "",
            genre: "",
            releaseYear: "",
            dateStarted: "",
            rating: "",
            review: "",
            cover: ""
        },

        podcast: {    
            title: "",
            author: "",
            genre: "",
            dateListened: "",
            rating: "",
            review: "",
            cover: "",
            link: ""
        },

        youtubeVideo: {    
            title: "",
            author: "",
            dateWatched: "",
            rating: "",
            review: "",
            cover: "",
            link: ""
        }
    });

    const [documents, setDocuments] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); // mensagem de erro

    // configuração dos campos de entrada (input) para cada tipo de conteúdo
    const contentFields = {
        book: [
            { name: "title", placeholder: "title", type: "text" },
            { name: "author", placeholder: "author", type: "text" },
            { name: "year", placeholder: "year", type: "text" },
            { name: "type", placeholder: "type", type: "text" },
            { name: "dateStarted", placeholder: "date started", type: "date" },
            { name: "dateFinished", placeholder: "date finished", type: "date" },
            { name: "rating", placeholder: "rating", type: "text" },
            { name: "resume", placeholder: "resume", type: "text" },
            { name: "cover", placeholder: "cover url", type: "text" },
        ],

        movie: [
            { name: "title", placeholder: "title", type: "text" },
            { name: "director", placeholder: "director", type: "text" },
            { name: "year", placeholder: "release year", type: "text" },
            { name: "dateWatched", placeholder: "date watched", type: "date" },
            { name: "rating", placeholder: "rating", type: "text" },
            { name: "review", placeholder: "review", type: "text" },
            { name: "cover", placeholder: "cover url", type: "text" }
        ],

        series: [
            { name: "title", placeholder: "title", type: "text" },
            { name: "year", placeholder: "release year", type: "text" },
            { name: "rating", placeholder: "rating", type: "text" },
            { name: "review", placeholder: "review", type: "text" },
            { name: "cover", placeholder: "cover url", type: "text  " }
        ],

        podcast: [
            { name: "title", placeholder: "title", type: "text" },
            { name: "author", placeholder: "host", type: "text" },
            { name: "genre", placeholder: "genre", type: "text" },
            { name: "dateListened", placeholder: "date listened", type: "date" },
            { name: "rating", placeholder: "rating", type: "text" },
            { name: "review", placeholder: "review", type: "text" },
            { name: "cover", placeholder: "cover url", type: "text" },
            { name: "link", placeholder: "link url", type: "text" }
        ],

        youtubeVideo: [
            { name: "title", placeholder: "title", type: "text" },
            { name: "author", placeholder: "author", type: "text" },
            { name: "dateWatched", placeholder: "date watched", type: "date" },
            { name: "rating", placeholder: "rating", type: "text" },
            { name: "review", placeholder: "review", type: "text" },
            { name: "cover", placeholder: "cover url", type: "text" },
            { name: "link", placeholder: "link url", type: "text" }
        ]
    }

    // buscar documentos do firestore
    const fetchDocuments = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "db-lasning"));
            const fetchDocuments = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setDocuments(fetchDocuments);
        } catch (error) {
            console.error("Erro ao buscar documentos:", error);
        }
    };

    // carregar documentos ao montar o componente
    useEffect(() => {
        fetchDocuments();
    }, []);

    
    // função de alterações no form
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "content") {
            setFormData((prevData) => ({
                ...prevData,
                content: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [formData.content]: {
                    ...prevData[formData.content],
                    [name]: value,
                }
            }));
        }
    };

    // função para renderizar campos de entrada (input) dinamicamente com base no select: content
    const renderFields = () => {
        const fields = contentFields[formData.content] || [];

        return fields.map((field) => (
            <input 
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[formData.content]?.[field.name] || ""}
                onChange={handleChange}
            />
        ));
    };

    // função para clicar no botão e exibir no console
    const handleSubmit = async (event) => { // assincrona
        event.preventDefault();

        // verificar se os campos estão preenchidos
        if ( !formData.content ) {
            setErrorMessage("Preencha todos os campos.");
            return;
        }

        setErrorMessage("");
        console.log("Dados enviados:", formData[formData.content]);

        // Adicionar dados ao Firestore
        try {
            const docRef = await addDoc(collection(db, "db-lasning"), {
                content: formData.content,
                ...formData[formData.content],
                timestamp: new Date(),
            });
            console.log("Documento salvo com o ID: ", docRef.id);
            
            // atualizar lista após envio
            fetchDocuments();

            // resetar o formulário
            setFormData({
                content: "",
                book: { title: "", author: "", year: "", type: "", dateStarted: "", dateFinished: "", rating: "", resume: "", cover: "" },
                movie: { title: "", director: "", genre: "", releaseYear: "", dateWatched: "", rating: "", review: "", cover: "" },
                series: { title: "", director: "", genre: "", releaseYear: "", dateStarted: "", rating: "", review: "", cover: "" },
                podcast: { title: "", author: "", genre: "", dateListened: "", rating: "", review: "", cover: "", link: "" },
                youtubeVideo: { title: "", author: "", dateWatched: "", rating: "", review: "", cover: "", link: "" }
            });
            console.log("Dados enviados com sucesso.");

        } catch (error) {
            console.error("Erro ao enviar os dados: ", error);
            alert("Erro ao enviar os dados. Tente novamente.");
        }
    }

    return (
        <div className="form-to-add">

            <h2>Add content:</h2>

            <select 
                name="content"
                onChange={handleChange}
                value={formData.content}
            >
                <option value="" disabled>choose content</option>
                <option value="book">book</option>
                <option value="movie">movie</option>
                <option value="series">series</option>
                <option value="podcast">podcast</option>
                <option value="youtubeVideo">youtube video</option>
            </select>

            {/* renderiza os campos de input com base no select content */}
            {formData.content && renderFields()}
            
            {/* botão para enviar para database */}
            <button type="submit" onClick={handleSubmit}>submit</button>

            {/* mensagem de erro */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <ContentList documents={documents} />
        </div>
    )
}