import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import Pagination from "./Pagination";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppContext } from "../Context";

export class News extends Component {
    static defaultProps = {
        country: "in",
        category: "general",
    };

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
    };

    static contextType = AppContext;

    articles = {
        status: "ok",
        totalResults: 25,
        articles: [
            {
                source: { id: null, name: "NDTV News" },
                author: "asd",
                title: "\"Begged Me... Said He's A Family Man\": Air India Flyer On 'Peeing' Shocker - NDTV",
                description:
                    "After a drunk passenger urinated on a woman flyer in the business class of an Air India flight last year, the crew brought the man to her seat and forced her to face him as he apologised and begged to be spared arrest, documents reveal.",
                url: "https://www.ndtv.com/india-news/air-india-flyer-on-peeing-shocker-begged-me-said-hes-a-family-man-3668438",
                urlToImage:
                    "https://c.ndtvimg.com/2023-01/if1u9qs8_air-india-generic_625x300_04_January_23.jpg",
                publishedAt: "2023-01-06T05:56:00Z",
                content:
                    'The woman has detailed her "appalling experience" in her letter to Air India, which is part of the FIR.\r\nNew Delhi: After a drunk passenger urinated on a woman flyer in the business class of an Air I… [+3284 chars]',
            },
            {
                source: {
                    id: "the-times-of-india",
                    name: "The Times of India",
                },
                author: "ET Telecom",
                title: "Xiaomi launches Redmi Note 12 5G series in India from Rs 17,999 - ETTelecom",
                description:
                    "The Redmi Note 12 series will be available for purchase on Mi store, Amazon, Flipkart, Mi Home, Mi Studio, and authorized retail partners.",
                url: "https://telecom.economictimes.indiatimes.com/news/xiaomi-launches-redmi-note-12-5g-series-in-india-from-rs-17999/96783417",
                urlToImage:
                    "https://etimg.etb2bimg.com/thumb/msid-96783417,imgsize-24976,width-1200,height-628,overlay-ettelecom/xiaomi-launches-redmi-note-12-5g-series-in-india-from-rs-17-999.jpg",
                publishedAt: "2023-01-06T05:49:00Z",
                content:
                    "Image via Redmi India (@RedmiIndia) on Twitter. \r\nNEW DELHI: Xiaomi has launched its latest Redmi Note series, the Redmi Note 12 5G series, in India with prices starting from Rs 17,999.The base model… [+2663 chars]",
            },
            {
                source: { id: null, name: "Business Standard" },
                author: "IANS",
                title: "CES 2023: Qualcomm announces 'Snapdragon Satellite' for android smartphones - Business Standard",
                description:
                    "Qualcomm and global satellite communications company Iridium have entered into an agreement to bring the satellitebased connectivity to nextgeneration premium Android smartphones",
                url: "https://www.business-standard.com/article/technology/ces-2023-qualcomm-announces-snapdragon-satellite-for-android-smartphones-123010600125_1.html",
                urlToImage:
                    "https://bsmedia.business-standard.com/_media/bs/img/article/2018-08/10/full/1533870389-4915.jpg",
                publishedAt: "2023-01-06T04:51:00Z",
                content:
                    "Chip-maker Qualcomm has announced 'Snapdragon Satellite' -- a satellite-based two-way capable messaging solution for premium smartphones at Consumer Electronic Show (CES) 2023.\r\nQualcomm and global s… [+1698 chars]",
            },
            {
                source: { id: null, name: "CNBCTV18" },
                author: "Akriti Anand",
                title: "A Factcheck On Covid-19 Symptoms — Does Muscle Pain, Dry Mouth, Skipping Meals Indicate Infection - CNBCTV18",
                description:
                    "Doctors believe that dry mouth, loss of appetite, diarhhea and gastrointestinal problems are normal in cases of infections and fever.",
                url: "https://www.cnbctv18.com/healthcare/covid-19-symptoms-bf-7-variant-fact-check-muscle-pain-dry-mouth-skipping-meals-diarrhoea-15597431.htm",
                urlToImage:
                    "https://images.cnbctv18.com/wp-content/uploads/2023/01/shutterstock_1643947495.jpg",
                publishedAt: "2023-01-06T04:45:11Z",
                content:
                    "Next Article\r\nMore than 50,000 smokers have embraced smoke-free life in 2022 with QuitSure",
            },
            {
                source: { id: null, name: "NDTV News" },
                author: "asd",
                title: "\"Begged Me... Said He's A Family Man\": Air India Flyer On 'Peeing' Shocker - NDTV",
                description:
                    "After a drunk passenger urinated on a woman flyer in the business class of an Air India flight last year, the crew brought the man to her seat and forced her to face him as he apologised and begged to be spared arrest, documents reveal.",
                url: "https://www.ndtv.com/india-news/air-india-flyer-on-peeing-shocker-begged-me-said-hes-a-family-man-3668438",
                urlToImage:
                    "https://c.ndtvimg.com/2023-01/if1u9qs8_air-india-generic_625x300_04_January_23.jpg",
                publishedAt: "2023-01-06T05:56:00Z",
                content:
                    'The woman has detailed her "appalling experience" in her letter to Air India, which is part of the FIR.\r\nNew Delhi: After a drunk passenger urinated on a woman flyer in the business class of an Air I… [+3284 chars]',
            },
        ],
    };

    capitalize = (word) => {
        let lower = word.toLowerCase();
        return word.charAt(0).toUpperCase() + lower.slice(1);
    };

    constructor(props) {
        super(props);
        console.log("constructor");
        console.log(props);

        if (props.category) {
            document.title = `${
                process.env.REACT_APP_PREFIX_SITE_TITLE
            } - ${this.capitalize(props.category)}`;
        } else {
            document.title = process.env.REACT_APP_SITE_TITLE;
        }

        this.state = {
            articles: [],
            totalResults: 0,
            pagination: {
                page: 0,
                pageSize: 2,
                minPage: 1,
                maxPage: 1,
            },
            loading: false,
        };
    }

    getNewsApiData = async (page = 1) => {
        page =
            page > this.state.pagination.maxPage
                ? this.state.pagination.maxPage
                : page < this.state.pagination.minPage
                ? this.state.pagination.minPage
                : page;

        console.log("count " + page);
        // console.log(this.state.pagination);

        if (page !== this.state.pagination.page) {
            this.context.setProgress(30);

            console.log("in " + page);

            // this.setState({ loading: true });

            // let API_KEY = process.env.REACT_APP_NEWS_API_KEY;
            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${API_KEY}&page=${page}&pageSize=${this.state.pagination.pageSize}`;
            // // console.log();
            // let newsData = await fetch(url);
            // newsData = await newsData.json();
            let newsData = this.articles;
            // console.log(newsData);

            // this.context.setProgress(70);

            let maxPage = Math.ceil(
                newsData.totalResults / this.state.pagination.pageSize
            );
            let pagination = {
                page: page,
                maxPage: maxPage < page ? page : maxPage,
            };
            // this.context.setProgress(70);
            // console.log(this.context);
            setTimeout(async () => {
                this.context.setProgress(70);

                this.setState((prevState) => ({
                    articles: this.state.articles.concat(newsData.articles),
                    totalResults: newsData.totalResults,
                    pagination: { ...prevState.pagination, ...pagination },
                    loading: false,
                }));
                this.context.setProgress(100);
            }, 2000);
            // this.context.setProgress(70);

            // console.log
        }

        return true;
    };

    componentDidMount() {
        if (this.getNewsApiDataFlag) {
            // already mounted previously
            return;
        }
        this.getNewsApiDataFlag = this.getNewsApiData();

        console.log("componentDidMoun");
        // this.firstrender = setInterval(() => this.getNewsApiData(), 1000);
    }

    componentWillUnmount() {
        // clearInterval(this.firstrender);
        console.log("componentWillUnmount");

        // this.getNewsApiData();
    }

    render() {
        // const rootContext = useContext(RootContext);

        return (
            <div className="container my-3">
                <h2 className="text-center">
                    New Monster - Top News Healine
                    {this.props.category
                        ? " On " + this.capitalize(this.props.category)
                        : ""}
                </h2>
                {/* {this.state.loading && <Spinner />} */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={() => {
                        let page = this.state.pagination.page + 1;
                        console.log("next" + page);
                        this.getNewsApiData(page);
                    }}
                    style={{
                        // display: "flex",
                        flexDirection: "column-reverse",
                        overflow: "none",
                    }} //To put endMessage and loader to the top.
                    // inverse={true} //
                    hasMore={
                        this.state.articles.length < this.state.totalResults
                    }
                    loader={<Spinner />}
                    // scrollableTarget="scrollableDiv"
                >
                    <div className="row">
                        {this.state.articles.map((item, key) => {
                            return (
                                <div className="col-md-3" key={key}>
                                    <NewsItem
                                        title={
                                            item.title
                                                ? item.title.slice(0, 40) +
                                                  " ..."
                                                : ""
                                        }
                                        description={
                                            item.description
                                                ? item.description.slice(
                                                      0,
                                                      80
                                                  ) + " ..."
                                                : ""
                                        }
                                        imgUrl={item.urlToImage}
                                        newsRouteID={item.url}
                                        item={{
                                            source: item.source,
                                            author: item.author,
                                            date: item.publishedAt,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    {/* <div className="container">
                        <Pagination
                            pagination={this.state.pagination}
                            getNewsApiData={this.getNewsApiData}
                        ></Pagination>
                    </div> */}
                </InfiniteScroll>
            </div>
        );
    }
}

export default News;
