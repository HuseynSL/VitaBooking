import React from 'react'
import style from "./style.module.css"
import ListSlider from '../../components/listSLider/ListSlider'

const List = () => {
  return (
    <div>
      <div className="listContainer flex justify-center mt-5">
        <div className="listWrapper w-full max-w-5xl flex gap-5">
          <ListSlider/>
        </div>
      </div>
    </div>

  )
}

export default List
