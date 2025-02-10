import { Link } from 'react-router-dom';

function Home({ characters }) {
    return (
        <>
            <header className='bg-gray-700 rounded-lg text-white p-6 shadow-lg'>
                <nav className='text-3xl font-bold text-center hover:text-blue-400 transition-colors'>
                    HONKAI: STAR RAIL
                </nav>
            </header>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8'>
                {characters.map((c, index) => (
                    <Link to={`/character/${c.id}`} key={index}>
                        <div className='relative group bg-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer'>
                            <img
                                id='path-icon'
                                className='absolute top-4 left-4 w-12 z-10 backdrop-blur-sm bg-white/30 rounded-full p-1'
                                src={`${c.path.icon}`}
                                alt={`${c.path.name} Path Icon`}
                            />
                            <img
                                id='element-icon'
                                className='absolute top-4 right-4 w-12 z-10 backdrop-blur-sm bg-white/30 rounded-full p-1'
                                src={`${c.element.icon}`}
                                alt={`${c.element.name} Element Icon`}
                            />
                            <img
                                className='w-full object-cover transition-transform group-hover:scale-110'
                                src={`${c.imageUrl}`}
                                alt={`${c.name} Splash Art`}
                            />
                            <h2 className='text-xl font-bold text-center py-4 bg-gray-700 text-white'>{c.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Home;