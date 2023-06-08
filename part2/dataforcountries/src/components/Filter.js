const Filter = ( { setFilter, filter } ) => {

    const handleFilter = (event) => {
        setFilter(event.target.value)
        console.log(filter)
      }

    return (<div>
        filter: <input 
                value={filter}
                onChange={handleFilter}
                />
        </div>
    )
}

export default Filter