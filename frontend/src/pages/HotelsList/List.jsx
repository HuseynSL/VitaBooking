import React from 'react'
import ListSlider from '../../components/listSLider/ListSlider'

const List = () => {
  return (
    <div>
      <div className="listContainer flex justify-center mt-5">
        <div className="listWrapper w-full max-w-5xl flex flex-col gap-5 md:flex-row">
          <ListSlider/>
        </div>
      </div>
    </div>

  )
}

export default List
