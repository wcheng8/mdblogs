import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => {
    return (
        <Layout>
            <article className="overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-4 font-weight-bold">
                                A BLOG FOR DEVELOPERS
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center pt-4 pb-5">
                            <p className="lead">
                                Best programming and web development blogs
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="flip flip-horizontal">
                                <div
                                    className="front"
                                    style={{
                                        backgroundImage:
                                            'url(' +
                                            'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                                            ')'
                                    }}
                                >
                                    <h2 className="text-shadow text-center h1">React</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/react">
                                        <a>
                                            <h3 className="h1">React</h3>
                                        </a>
                                    </Link>
                                    <p className="lead">The world's most popular frontend web development library</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="flip flip-horizontal">
                                <div
                                    className="front"
                                    style={{
                                        backgroundImage:
                                            'url(' +
                                            'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                                            ')'
                                    }}
                                >
                                    <h2 className="text-shadow text-center h1">Node</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/node-js">
                                        <a>
                                            <h3 className="h1">Node Js</h3>
                                        </a>
                                    </Link>
                                    <p className="lead">
                                        The worlds most popular backend development tool for JavaScript
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="flip flip-horizontal">
                                <div
                                    className="front"
                                    style={{
                                        backgroundImage:
                                            'url(' +
                                            'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                                            ')'
                                    }}
                                >
                                    <h2 className="text-shadow text-center h1">Mongo DB</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/mongo-db">
                                        <a>
                                            <h3 className="h1">Mongo DB</h3>
                                        </a>
                                    </Link>
                                    <p className="lead">A perfect database for you new projects</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default Index;