import React from 'react'
import axios from 'axios';
import LibCommon from '../libs/LibCommon';
import TopPostsRow from './Layouts/TopPostsRow';
//
class Home extends React.Component {
    constructor(props) {
        super(props);
        //pages_display
//        this.state = {data: ''}
        this.state = {data: '', pages_display:0 }
    }  
    componentDidMount(){
        var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
        axios.get('./cms.json?' + dt).then(response => {
            var resData = response.data
            resData.items = LibCommon.get_reverse_items( resData.items )
        //        this.setState({ data: response.data })
            this.setState({ data: resData })
            if(resData.file_version != null){
//console.log( this.state.data )
                if(this.state.data.page_items != null){
                    if(this.state.data.page_items.length > 0){
                        this.setState({ pages_display: 1 })
                    }
console.log( this.state.data.page_items )
console.log( this.state.pages_display )
                }
            }else{
                alert("Error, file version can not import, version 2 over require")
            }
//console.log( this.state.data.items )
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    tabRow(){
        if(this.state.data.items instanceof Array){
            return this.state.data.items.map(function(object, i){
                return <TopPostsRow obj={object} key={i} />
            })
        }
    }    
    render(){
        return(
        <div className="body_main_wrap">
            <div id="div_img_main2"  className="cover" valign="bottom">
                <div id="div_img_layer">
                    <h1>〇〇 Blog<br />
                    </h1>
                </div>
            </div> 
            <div className="container">
                <div className="row conte mt-2" id="id_row_service">
                    <div className="col-sm-12">
                        <h2 className="h4_td_title mt-2">Topic</h2>
                        <hr className="hr_ex1"/>
                    </div>
                </div>                
                <div className="row conte">
                    <div className="col-sm-4">
                        <img className="img_kao mt-2 mb-2" src="https://raw.githubusercontent.com/kuc-arc-f/screen-img/master/web/pc1.png" />
                    </div>
                    <div className="col-sm-8">
                        <h3>このサイトの紹介 </h3>
                        <p>紹介の文章、１２３</p>
                    </div>
                </div>
                <div className="body_wrap">
                    <div id="post_items_box" className="row conte mt-2 mb-4">
                        <div className="col-sm-12">
                            <div id="div_news">
                                <h2 className="h4_td_title mt-2 mb-2" >New Post</h2>
                            </div>  
                            {this.tabRow()}                      

                        </div>
                    </div>
                </div>

            </div>
        </div>
        )
    }
}


export default Home;

