import React, {Component} from "react"
import axios from 'axios'

class Home extends Component {
    constructor(props){
      super(props)
      this.state = {
        movies : []
      }
    }

    componentWillMount =(() => {
        if(this.state.movies.length === 0){
            axios.get(`http://backendexample.sanbercloud.com/api/movies`)
                .then(res => {
                    let data = res.data.map(el => {
                        return {
                            title:el.title, description:el.description, year:el.year, duration:el.duration, genre:el.genre, rating:el.rating
                        }
                    })
                    this.setState({movies:data})
                })
                .catch(err => {
                    console.log(err)
                })
        }})

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
                            <b>Rating</b> {rating} <br/>
                            <b>Duration:</b> {duration} minutes<br/>
                            <b>Genre:</b> {genre} <br/>
                        <p><b>Description:</b> {description}</p><hr/>
                        </div>                    
                    )
                    })
                }
  
        </>
        )
    }
}

export default Home