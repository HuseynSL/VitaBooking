import React from 'react';
import useFetch from '../../hooks/useFetch';
import url from '../../utils/baseUrl';

const PropertyList = () => {
  const { data, loading, error } = useFetch(`${url}/hotels/countByType`);

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];

  if (loading) {
    return <div className="text-center text-gray-600 py-8">Loading please wait...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">Error: {error.message}</div>;
  }

  if (!data || !images || data.length === 0 || images.length === 0) {
    return <div className="text-center text-gray-600 py-8">No data available.</div>;
  }

  return (
    <div className="pList grid grid-cols-2 w-full max-w-6xl mx-auto gap-4 p-4 md:grid-cols-3 lg:grid-cols-5">
      {data.map((item, i) => (
        <div className="pListItem rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300" key={i}>
          <img
            src={images[i]}
            alt={item.type}
            className="pListImg w-full h-40 object-cover"
          />
          <div className="pListTitles p-3">
            <h1 className="text-lg font-bold capitalize">{item.type}</h1>
            <h2 className="text-sm text-gray-600">
              {item.count} {item.type}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;