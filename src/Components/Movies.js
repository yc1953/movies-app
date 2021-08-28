import React, { Component } from 'react'
import axios from 'axios'

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            currSearchText: "",
            currPage: 1,
            limit: 4,
            genres: [{ _id: 'abcd', name: 'All Genres' }],
            currGenre: 'All Genres'
        }
    }

    async componentDidMount() {
        let res = await axios.get('https://backend-react-movie.herokuapp.com/movies');
        let genreRes = await axios.get('https://backend-react-movie.herokuapp.com/genres');
        console.log(genreRes.data.genres);
        this.setState({
            movies: res.data.movies,
            genres: [...this.state.genres, ...genreRes.data.genres]
        });
    }

    deleteMovie = (id) => {
        /* We are copying array like this because we do not directly change the state */
        let nMovies = this.state.movies;
        nMovies = nMovies.filter((data) => {
            return data._id !== id;
        });
        this.setState({
            movies: nMovies
        });
    }

    filterMovie = (e) => {
        let val = e.currentTarget.value;
        this.setState({
            currSearchText: val,
            currPage: 1
        })
    }

    sortStock = (e) => {
        let nMovies = this.state.movies;
        nMovies.sort((mObj1, mObj2) => {
            if (e.target.className === 'fa fa-sort-up')
                return mObj1.numberInStock - mObj2.numberInStock;
            return mObj2.numberInStock - mObj1.numberInStock;
        });

        this.setState({
            movies: nMovies
        })
    }

    sortRate = (e) => {
        let nMovies = this.state.movies;
        nMovies.sort((mObj1, mObj2) => {
            if (e.target.className === 'fa fa-sort-up')
                return mObj1.dailyRentalRate - mObj2.dailyRentalRate;
            return mObj2.dailyRentalRate - mObj1.dailyRentalRate;
        });

        this.setState({
            movies: nMovies
        })
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            currPage: pageNumber
        })
    }

    handleLimitChange = (e) => {
        this.setState({
            limit: e.target.value
        })
    }

    handleGenreChange = (name) => {
        this.setState({
            currGenre: name
        })
    }

    render() {
        console.log('render');
        let { movies, currSearchText, currPage, limit, genres, currGenre } = this.state;
        let filteredArr = [];
        if (filteredArr === "") {
            filteredArr = movies;
        }
        else {
            filteredArr = movies.filter((data) => {
                let title = data.title.toLowerCase();
                return title.includes(currSearchText.toLowerCase());
            })
        }

        filteredArr = filteredArr.filter((data) => {
            return data.genre.name === currGenre || currGenre === 'All Genres';
        })

        let numberOfPages = Math.ceil(filteredArr.length / limit);
        let pageNumberArr = [];
        for (let i = 1; i <= numberOfPages; i++) {
            pageNumberArr.push(i);
        }
        let si = (currPage - 1) * limit;
        let ei = si + limit - 1;
        filteredArr = filteredArr.slice(si, ei + 1);

        /* if(filteredArr.length === 0) {
            this.setState({
                currPage: 1
            })
        } */
        return (
            <>
                {
                    this.state.movies.length === 0 ?
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <div className="container">
                            <nav className="navbar navbar-dark bg-dark">
                                <span className="navbar-brand" style={{ color: "white" }}>Moovy</span>
                                <form className="form-inline">
                                    <input className="form-control mr-sm-2" value={this.state.currSearchText} onChange={(e) => this.filterMovie(e)} type="search" placeholder="Search" aria-label="Search"></input>
                                </form>
                            </nav>
                            <div className="row">
                                <div className="col-3">
                                    <ul className="list-group">
                                        {
                                            genres.map((data) => {
                                                let classname = "list-group-item";
                                                if (data.name === currGenre)
                                                    classname += ' active'
                                                return (
                                                    <li className={classname} key={data._id} style={{ cursor: "pointer" }} onClick={() => this.handleGenreChange(data.name)}>{data.name}</li>
                                                );
                                            })
                                        }
                                    </ul>
                                    <h5>Current Genre: {currGenre}</h5>
                                </div>
                                <div className="col-9">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col">
                                                    <i className="fa fa-sort-up" style={{ cursor: "pointer" }} onClick={this.sortStock}></i>
                                                    Stock
                                                    <i className="fa fa-sort-down" style={{ cursor: "pointer" }} onClick={this.sortStock}></i>
                                                </th>
                                                <th scope="col">
                                                    <i className="fa fa-sort-up" style={{ cursor: "pointer" }} onClick={this.sortRate}></i>
                                                    Rate
                                                    <i className="fa fa-sort-down" style={{ cursor: "pointer" }} onClick={this.sortRate}></i>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredArr.map((movieObj) => {
                                                    return (
                                                        <tr key={movieObj._id}>
                                                            <td></td>
                                                            <td>{movieObj.title}</td>
                                                            <td>{movieObj.genre.name}</td>
                                                            <td>{movieObj.numberInStock}</td>
                                                            <td>{movieObj.dailyRentalRate}</td>
                                                            <td><button type="button" className="btn btn-danger" onClick={() => {
                                                                this.deleteMovie(movieObj._id)
                                                            }}>Delete</button></td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>

                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            {
                                                pageNumberArr.map((pageNumber) => {
                                                    let classStyle = 'page-item';
                                                    pageNumber === currPage ? classStyle += ' active' : classStyle += '';
                                                    return (
                                                        <li className={classStyle} key={pageNumber} onClick={() => this.handlePageChange(pageNumber)}><span className="page-link">{pageNumber}</span></li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </nav>
                                    <div className="form-group">
                                        <input type="number" className="form-control col-2" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.limit} onChange={this.handleLimitChange}></input>
                                        <small id="emailHelp" className="form-text text-muted">Number of movies per page.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </>
        )
    }
}
