const Filter = ( { setFilter, filter } ) => {

    const handleFilter = (event) => {
        setFilter(event.target.value)
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