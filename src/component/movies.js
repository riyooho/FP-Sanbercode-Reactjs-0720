import React, {useContext, useState, useEffect} from "react"
import axios from 'axios'
import LoginContext from '../login/logincontext.js'

const Movies = () => {
    const {movies, setMovies} = useContext(LoginContext)
    const {status, setStatus} = useContext(LoginContext)
	const [input, setInput] = useState({
        title: "",
        description: "",
        year: 0,
        duration: 0,
        genre: "",
        rating: 0
    })
	const [statusForm, setStatusForm] = useState("create")
    const [selectedId, setSelectedId] = useState(0)
    
    useEffect(() =>{
		if(movies === null){
			axios.get(`http://backendexample.sanbercloud.com/api/movies`)
				.then(res => {
					setMovies(res.data.map(el => {return {id: el.id, title:el.title, description:el.description, year:el.year, duration:el.duration, genre:el.genre, rating:el.rating}}))
				})
		}
    },[movies])
    
	const handleDelete = (event) => {
		let id = Number(event.target.value)
		let newMovies = movies.filter(el => el.id !== id)

		axios.delete(`http://backendexample.sanbercloud.com/api/movies/${id}`)
            .then(res => {
                console.log(res)
            })
		setMovies([...newMovies])
    }
    
    const handleEdit = (event) => {
		let id = Number(event.target.value)
		console.log(movies)
        let movie = movies.find(x => x.id === id)
		setInput({
            id: movie.id,
            title : movie.title, 
            description : movie.description, 
            year : movie.year, 
            duration : movie.duration, 
            genre : movie.genre, 
            rating : movie.rating
        })
		setSelectedId(id)
		setStatusForm("edit")
    }
    
    const handleChange = (event) => {
		const { name, value } = event.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
		}))
    }
    
    const handleSubmit = (event) => {
		event.preventDefault()
        if(input['title'].replace(/\s/g, '') !== "" 
        && input['description'].toString().replace(/\s/g, '') !== "" 
        && input['year'].toString().replace(/\s/g, '') !== "" 
        && input['duration'].toString().replace(/\s/g, '') !== "" 
        && input['genre'].toString().replace(/\s/g, '') !== "" 
        && input['rating'].toString().replace(/\s/g, '') !== ""         
        ){
			if(statusForm === "create"){
				axios.post(`http://backendexample.sanbercloud.com/api/movies`, input)
					.then(res => {
						console.log(res.data)
                        setMovies([...movies, {id: res.data.id, title: res.data.title, description: res.data.description, year: res.data.year, duration: res.data.duration, genre: res.data.genre, rating: res.data.rating}
                        ])
					})


			}else if(statusForm === "edit"){
				axios.put(`http://backendexample.sanbercloud.com/api/movies/${selectedId}`, input)
					.then(res => {
						let movie = movies.find(el => el.id === selectedId)
                        movie['id'] = input.id
                        movie['title'] = input.title
						movie['description'] = input.description
                        movie['year'] = input.year
                        movie['duration'] = input.duration
						movie['genre'] = input.genre
						movie['rating'] = input.rating
						setMovies([...movies])
					})
			}

			setStatusForm("create")
			setSelectedId(0)
			setInput({
                title: "",
                description: "",
                year: 0,
                duration: 0,
                genre: "",
                rating: 0
			})
		}
    }
    
    return (     
		<>
        <h1>Add Movie</h1>
            <div id="form-content" className="container">
                <form onSubmit={handleSubmit}>
                    <label>Title : </label><br/>          
                    <input type="text" name='title' value={input.title} onChange={handleChange}/><br/><br/>
                    <label>Genre : </label><br/>
                    <input type="text" name='genre' value ={input.genre} onChange={handleChange}/><br/><br/>
                    <label>Year : </label><br/>
                    <input type="number" name='year' value={input.year} onChange={handleChange}/><br/><br/>
                    <label>Duration (minutes): </label><br/>          
                    <input type="number" name='duration' value={input.duration} onChange={handleChange}/><br/><br/>
                    <label>Rating : </label><br/>
                    <input type="number" name='rating' value ={input.rating} onChange={handleChange} min="1" max="10" placeholder="1-10"/><br/><br/>
                    <label>Description : </label><br/>
                    <textarea type="text" name='description' value={input.description} onChange={handleChange}/><br/><br/>
                    <input type="submit" value="submit"/>
                </form>
            </div> 

        <h1>Data Movies</h1>
        <div className="container">
        <table style={{width: "100%"}}>
			{movies !== null && movies.map((val,index) =>{
				return(
			<tr key={index} style={{padding: "10px"} }>
            <td>{val.title}</td>
            <td>{val.genre}</td>
            <td>{val.year}</td>
            <td>{val.duration}</td>
            <td>{val.rating}</td>
            <td>{val.description}</td>
            <td>
            <button className="log" onClick={handleEdit} value={val.id}>Ubah</button>
            <button className="log" onClick={handleDelete} value={val.id}>Hapus</button>
            </td>
          </tr>
				)
			})}
		</table>
        </div>
        </>
    );
}

export default Movies;