import React, {Component} from "react"
import axios from 'axios'

class Home extends Component {
    constructor(props){
      super(props)
      this.state = {
        movies : []
      }
    }

    componentWillMount = () => {
        // const {movie} = await axios.get(`http://backendexample.sanbercloud.com/api/movies`)

            axios
                .get(`http://backendexample.sanbercloud.com/api/movies`)
                .then(res => {
                    console.log(res.data);
                    this.setState.movies(res.data.map(el => {return {title:el.title, description:el.description, year:el.year, duration:el.duration, genre:el.genre, rating:el.rating}
                    }))  
                })
                .catch(err => {
                    console.log("error data!!!")
                })
                console.log(this.state.movies);
        
    }

    // componentWillUnmount(){
    //     console.log(this.componentWillUnmount)
    // }
    
    // keyExtractor = (item, index) => index.toString()
    // renderItem = ({item}) => (

    // )

    render() {
        return(
        <>
            <h1>Daftar Film Terbaik</h1>
                {
                    this.state.movies.map((val, index)=>{
                        const {title, description, duration, genre, rating} = val
                    return(
                        <div key={index}>
                        <h2>{title}</h2>
                        <>
                        Rating {rating}
                        Duration: {duration}
                        Genre: {genre}
                        </>
                        <p>Description: {description}</p>
                        </div>                    
                    )
                    })
                }
                    
        </>
        )
    }
}

export default Home