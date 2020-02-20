// images 
import blog1 from '../../images/blog/blog1.jpg'
import blog2 from '../../images/blog/blog2.jpg'
import blog3 from '../../images/blog/blog3.jpg'
import blog4 from '../../images/blog/blog4.jpg'
import blog5 from '../../images/blog/blog5.jpg'
import blog6 from '../../images/blog/blog6.jpg'
import blog7 from '../../images/blog/blog7.jpg'
import blog8 from '../../images/blog/blog8.jpg'
import blog9 from '../../images/blog/blog9.jpg'
import blog10 from '../../images/blog/blog10.jpg'
import blog11 from '../../images/blog/blog7.jpg'
import blog12 from '../../images/blog/blog3.jpg'
// images
import team1 from '../../images/team/img1.jpg';
import team2 from '../../images/team/img2.jpg';
import team3 from '../../images/team/img3.jpg';

const blogs = [
    {
        id: 1,
        image: blog1,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing. 1',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?',
        meta: {
            like: 30,
            name: 'Jon Deo',
            date: '30/12/2019'
        },
        comments: [
            {
                author: 'Jone Deo',
                authorImage: null,
                date: '1 days ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente possimus molestias nostrum doloremque ut explicabo id aliquid vel quo harum adipisci ipsam sed repellat atque veniam quae eaque sit officiis, fuga ea hic animi. Culpa dolores eius illo, atque quae cupiditate architecto iste assumenda minima corrupti, dolorem consequatur commodi aliquid amet provident velit necessitatibus'
            },
            {
                author: 'Jone Deo',
                authorImage: team2,
                date: '20 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team3,
                date: '10 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
        ]
    },
    {
        id: 2,
        image: blog2,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing. 2',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?',
        meta: {
            like: 45,
            name: 'Jon Deo',
            date: '30/12/2019'
        },
        comments: [
            {
                author: 'Jone Deo',
                authorImage: team2,
                date: '20 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: null,
                date: '10 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
        ],
    },
    {
        id: 3,
        image: blog3,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing. 3',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?',
        meta: {
            like: 17,
            name: 'Jon Deo',
            date: '30/12/2019'
        },
        comments: [
            {
                author: 'Jone Deo',
                authorImage: team1,
                date: '1 days ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: null,
                date: '20 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
        ],
    },
    {
        id: 4,
        image: blog4,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing. 4',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?',
        meta: {
            like: 741,
            name: 'Jon Deo',
            date: '30/12/2019'
        },
        comments: [
            {
                author: 'Jone Deo',
                authorImage: team1,
                date: '1 days ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: null,
                date: '20 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team3,
                date: '10 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
        ],
    },
    {
        id: 5,
        image: blog5,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing. 5',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?',
        meta: {
            like: 123,
            name: 'Jon Deo',
            date: '30/12/2019'
        },
        comments: [
            {
                author: 'Jone Deo',
                authorImage: team1,
                date: '1 days ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team2,
                date: '20 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team3,
                date: '10 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
        ],
    },
    {
        id: 6,
        image: blog6,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing. 6',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?',
        meta: {
            like: 785,
            name: 'Jon Deo',
            date: '30/12/2019'
        },
        comments: [
            {
                author: 'Jone Deo',
                authorImage: team1,
                date: '1 days ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team2,
                date: '20 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team3,
                date: '10 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
        ],
    },
    {
        id: 7,
        image: blog7,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing. 7',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?',
        meta: {
            like: 12,
            name: 'Jon Deo',
            date: '30/12/2019'
        },
        comments: [
            {
                author: 'Jone Deo',
                authorImage: team1,
                date: '1 days ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team2,
                date: '20 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team3,
                date: '10 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
        ],
    },
    {
        id: 8,
        image: blog8,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing. 8',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?',
        meta: {
            like: 45,
            name: 'Jon Deo',
            date: '30/12/2019'
        },
        comments: [
            {
                author: 'Jone Deo',
                authorImage: team1,
                date: '1 days ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team2,
                date: '20 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team3,
                date: '10 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
        ],
    },
    {
        id: 9,
        image: blog9,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing. 9',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?',
        meta: {
            like: 145,
            name: 'Jon Deo',
            date: '30/12/2019'
        },
        comments: [
            {
                author: 'Jone Deo',
                authorImage: team1,
                date: '1 days ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team2,
                date: '20 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team3,
                date: '10 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
        ],
    },
    {
        id: 10,
        image: blog10,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing. 10',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?',
        meta: {
            like: 145,
            name: 'Jon Deo',
            date: '30/12/2019'
        },
        comments: [
            {
                author: 'Jone Deo',
                authorImage: team1,
                date: '1 days ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team2,
                date: '20 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team3,
                date: '10 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
        ],
    },
    {
        id: 11,
        image: blog11,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing. 11',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?',
        meta: {
            like: 14,
            name: 'Jon Deo',
            date: '30/12/2019'
        },
        comments: [
            {
                author: 'Jone Deo',
                authorImage: team1,
                date: '1 days ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team2,
                date: '20 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team3,
                date: '10 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
        ],
    },
    {
        id: 12,
        image: blog12,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing. 11',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?',
        meta: {
            like: 798,
            name: 'Jon Deo',
            date: '30/12/2019'
        },
        comments: [
            {
                author: 'Jone Deo',
                authorImage: team1,
                date: '1 days ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team2,
                date: '20 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
            {
                author: 'Jone Deo',
                authorImage: team3,
                date: '10 min ago',
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A illum laboriosam eligendi itaque aut totam nihil harum eos vitae id natus, mollitia laudantium corrupti fuga?'
            },
        ],
    },
]
export default blogs