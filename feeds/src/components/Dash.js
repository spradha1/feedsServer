import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Dash.module.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Navigator from './Navigator';


export default function Dash() {

  const { links } = useAuth();
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState('timeSort');
  const postSort = {
    "timeSort": sortPostsByTime,
    "titleSort": sortPostsByTitle
  };


  useEffect(() => {

    let nposts = [];
    links.forEach(l => {
      fetch(`/feeds_reader/${l}`, { 
        mode: 'cors'
      })
      .then((response) => response.text())
      .then(xmlTxt => new DOMParser().parseFromString(xmlTxt, 'text/xml'))
      .then(data => {
        const items = data.querySelectorAll("item");
        let vals = [];
        for (let i = 0; i < items.length; i++) {
          
          let item = items[i];  // parsing feed
          let linkStr = '';
          let dateStr = '';
          let titleStr = '';
          let descStr = '';

          try {
            linkStr = cdataRemove(item.querySelector('link').innerHTML);
          } catch (e) {
            console.log('Link not found: ' + e.message);
          }
          try { // date
            dateStr = cdataRemove(item.querySelector('pubDate').innerHTML);
            const dateObj = new Date(dateStr);
            dateStr = formatNum(dateObj.getMonth()) + '/' + formatNum(dateObj.getDate()) + '/' + dateObj.getFullYear() + " " + formatNum(dateObj.getHours()) + ":" + formatNum(dateObj.getMinutes());
          } catch (e) {
            console.log('Date not found: ' + e.message);
          }
          try { // title
            titleStr = cdataRemove(item.querySelector('title').innerHTML);
          } catch (e) {
            console.log('Title not found: ' + e.message);
            titleStr = 'Untitled';
          }
          try {// description
            descStr = cdataRemove(item.querySelector('description').innerHTML);
            descStr = descStr.replace(/&lt;/g, "<");
            descStr = descStr.replace(/&gt;/g, ">");
          } catch (e) {
            console.log('Description not found: ' + e.message);
            descStr = 'No description available for this article/document';
          }
          
          const tmp = {
            link: linkStr,
            title: titleStr,
            pubDate: dateStr,
            description: descStr,
          };
          vals.push(tmp);
        }
        nposts = nposts.concat(vals);
        setPosts(nposts);
      })
      .catch(e => {
        console.log("Error fetching feed from one or more links: " + e.message);
      });
    });
  }, [links]);

  
  // remove <![CDATA[ ]]> tags
  function cdataRemove (txt) {
    txt = txt.replace(/<!\[CDATA\[/, "")
    txt = txt.replace(/\]\]>/, "");
    return txt.trim();
  }

  // sort feed items by pubDate
  function sortPostsByTime (a, b) {
    const da = new Date(a.pubDate);
    const db = new Date(b.pubDate); 
    if (da > db) {
      return -1
    }
    else {
      return 1;
    }
  }

  // sort feed items by title
  function sortPostsByTitle (a, b) {
    const ta = (a.title.toLowerCase()).replace(/'|"/g, "").trim();
    const tb = (b.title.toLowerCase()).replace(/'|"/g, "").trim();
    return ta > tb ? 1: -1;
  }

  // select sorting function for posts
  function handleSortOption (selectedKey) {
    setSortOption(selectedKey);
  }

  // 2-digit format with leading zeroes
  function formatNum (num) {
    const nstr = num.toString();
    return num < 10 ? '0' + nstr: nstr;
  }


  posts.sort(postSort[sortOption]);

  return (
    <div className={styles.DashContainer}>
      <Navigator />
      {posts.length ?
        <DropdownButton onSelect={(selectedKey) => handleSortOption(selectedKey)}className="w-100 mb-2" align="end" title="Sort By" id="dropdown-menu-align-right">
          <Dropdown.Item eventKey="timeSort">Most recent</Dropdown.Item>
          <Dropdown.Item eventKey="titleSort">Title A-Z</Dropdown.Item>
        </DropdownButton>
        :
        <></>
      }
      <div className={styles.FeedContainer}>
        {posts.map((m, idx) => {
          return (
            <div className={styles.FeedItem} key={idx}>
              <h5><a className={styles.title} href={m.link} target='_blank' rel="noreferrer" alt={m.title}>{m.title}</a></h5>
              <p className={styles.datestr}>{m.pubDate}</p>
              <div dangerouslySetInnerHTML={{__html: `${m.description}`}}></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

