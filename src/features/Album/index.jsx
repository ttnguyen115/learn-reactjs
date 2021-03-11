import React from 'react';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Tình bạn diệu kì',
            url: 'assets/img/img1.jpg'
        },
        {
            id: 2,
            name: 'Nàng thơ',
            url: 'assets/img/img2.jpg'
        },
        {
            id: 3,
            name: 'Trên tình bạn dưới tình yêu',
            url: 'assets/img/img3.jpg'
        }
    ]

    return (
        <div>
            <h2>Album lists</h2>
            <AlbumList albumList={ albumList } />
        </div>
    );
}

export default AlbumFeature;