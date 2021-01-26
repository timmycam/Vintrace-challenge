import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import logo from './w-temp.png';
import './Product.css';

export const Product = props => {
  const { lotCode } = props;
  const [productData, setProductData] = useState({})
  useQuery("http://localhost:3003/api/product" + `/${lotCode}`, () =>
    axios.get("http://localhost:3003/api/product" + `/${lotCode}` )
    .then( res => { setProductData(res.data) })
  );

  return(
    <div className="product-view">
      <Header lotCode={lotCode} description={productData.description}/>
      <ProductTable productData={productData}/>
      <ProductBreakdown lotCode={lotCode}/>
    </div>
  )
}

const Header = props => {
  const {lotCode, description} = props;
  return(
      <div className="ProductHeader">
        <div className="HeaderContainer">
          <div className="Header">
            <h1><span><img src={logo} className="w-icon" alt="logo"/></span>{lotCode}</h1>
          </div>
          <div className="SubHeader">
            <p>{description}</p>
          </div>
        </div>
      </div>
  );
}

const ProductTable = (props) => {
  const {productData} = props
  return(
    <table>
      <tr>
        <td>
          <div className="fs">
            Volume
          </div>
        </td>
        <td>
          <div className="fe">
            {productData.volume ? productData.volume + " L" : "-"}
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div className="fs">
            Tank Code
          </div>
        </td>
        <td>
          <div className="fe">
            {productData.tankCode ? productData.tankCode : "-"}
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div className="fs">
            Product State
          </div>
        </td>
        <td>
          <div className="fe">
          {productData.productState  ? productData.productState : "-"}
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div className="fs">
            Owner Name
          </div>
        </td>
        <td>
          <div className="fe">
            {productData.ownerName ? productData.ownerName : "-"}
          </div>
        </td>
      </tr>
    </table>
  )
}

const ProductBreakdown = props => {
  return(
    <div className="tab">
      <Tabs>
        <div label="Year">
          <BreakdownTable breakdownType="year" lotCode={props.lotCode} label="Year"/>
        </div>
        <div label="Variety">
          <BreakdownTable breakdownType="variety" lotCode={props.lotCode} label="Variety"/>
        </div>
        <div label="Region">
          <BreakdownTable breakdownType="region" lotCode={props.lotCode} label="Region"/>
        </div>
        <div label="Year & Variety">
          <BreakdownTable breakdownType="year-variety" lotCode={props.lotCode} label="Year & Variety"/>
        </div>
      </Tabs>

    </div>
  )
}

const Tabs = props => {
  const { children } = props;
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  }

  return (
    <div>
      <ol className="tab-list">
        {children.map((child) => {
          const { label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}

const Tab = props => {

  const { activeTab, label } = props;

  let className = "tab-list-item";

  if (activeTab === label) {
    className += " tab-list-active";
  }

  const onClick = () => {
    const { label, onClick } = props;
    onClick(label);
  };
  
  return (
    <li className={className} onClick={onClick}>
      {label}
    </li>
  );

}

const BreakdownTable = props => {
  const {breakdownType, lotCode, label} = props;

  const [breakdownData, setBreakdown] = useState({});

  useQuery("http://localhost:3003/api/breakdown/" + `${breakdownType}/${lotCode}`, () =>
    axios.get("http://localhost:3003/api/breakdown/" + `${breakdownType}/${lotCode}`)
    .then( res => { setBreakdown(res.data) })
  );

  return(
    <table className="breakdown-table">
      <thead>
        <tr className="breakdown-row">
          <td className="breakdown-cell">
            <div className="fs capitalise">
              {label}
            </div>
          </td>
          <td className="breakdown-cell">
            <div className="fe">
              Percentage
            </div>
          </td>
        </tr>
        <tr className="divider-row">
          <td className="divider-cell" colspan="100%">
            <hr/>
          </td>
        </tr>
      </thead>
      { 
        (breakdownData.breakdown && breakdownData.breakdown.length > 0)
        ?
        breakdownData.breakdown.map( item => {
          return(
            <tbody>
            <tr className="breakdown-row">
              <td className="breakdown-cell">
                <div className="fs">
                  {item.key}
                </div>
              </td>
              <td className="breakdown-cell">
                <div className="fe">
                  {item.percentage}
                </div>
              </td>
            </tr>
            <tr className="divider-row">
              <td className="divider-cell" colspan="100%">
                <hr/>
              </td>
            </tr>
            </tbody>
          )
        })
        :
        null
      }
    </table>
  )
}
