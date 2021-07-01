import React, {useEffect, useState} from "react";
import './App.css';

// const USERS_URL = 'https://example.com/api/users';
// const USERS_URL = "https://gist.githubusercontent.com/falcon013/63e47740fc9003b7ccd13c695d0cfc71/raw/21af82d0f1dab7ae869be950de823217bc99539f/gistfile1.txt"
// mockapi.io - https://60dd2f71c2b6280017febe30.mockapi.io/api/users?page=1&limit=10
const USERS_URL = "https://60dd2f71c2b6280017febe30.mockapi.io/api/users"
const userLimitPerPage = 10;

export default function Table() {
    const [users, setUsers] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationButtonsEnabled, setPaginationButtonsEnabled] = useState(true);

    useEffect(() => {
        const getData = async () => {
            let url = `${USERS_URL}?page=${currentPage}&limit=${userLimitPerPage}`
            try {
                let response = await fetch(url);
                let data = await response.json();
                setUsers(data.results);
                setLastPage(Math.ceil(data.count / userLimitPerPage));
            } catch (error) {
                console.log(error)
            }
        }
        getData();
        setPaginationButtonsEnabled(false);
    }, [currentPage])

    const renderTable = () => {
        return users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                </tr>
            )
        })
    }
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
                </thead>
                <tbody>
                {renderTable()}
                </tbody>
            </table>
            <section className="pagination">
                <button disabled={paginationButtonsEnabled} onClick={() => {
                    setCurrentPage(1)
                }
                } className="first-page-btn">first
                </button>
                <button disabled={paginationButtonsEnabled} onClick={ () => {
                    if (currentPage > 1)
                        setCurrentPage(currentPage - 1);
                }
                } className="previous-page-btn">previous
                </button>
                <button disabled={paginationButtonsEnabled} onClick={ () => {
                    if (currentPage < lastPage)
                        setCurrentPage(currentPage + 1);
                }
                } className="next-page-btn">next</button>
                <button disabled={paginationButtonsEnabled} onClick={() => {
                    setCurrentPage(lastPage);
                }
                } className="last-page-btn">last
                </button>
            </section>
        </div>
    );
};