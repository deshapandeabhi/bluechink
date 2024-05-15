
import React from 'react';
import image123 from '../assets/image123.jpeg';
import helmet from '../assets/smallHealmet.jpeg'; // Changed import for helmet image
import jacket from '../assets/jacket.jpeg';
import gloves from '../assets/gloves.jpeg';
import shoes from '../assets/shoes.jpeg';
import saftyHat from '../assets/saftyHat.jpeg'; // Importing saftyHat image
import safetyJacket from '../assets/safetyJacket.jpeg'; // Importing saftyHat image
import safetyGloves from '../assets/safetyGloves.jpeg'; // Importing saftyHat image
import safetyBoots from '../assets/safetyBoots.jpeg'; // Importing saftyHat image
import bighelmet from '../assets/bigHealmet.jpeg'
import tickSign from '../assets/tickSign.jpeg'; // Importing tickSign image
import wrongSign from '../assets/wrongSign.jpeg'; // Importing wrongSign image

const YourComponent = () => {
  const imageWidth = 500; // Adjust this value to match the desired width of image123.jpeg
  const imagePositionRight = 400; // Move image123 right by 250px
  const itemPositionRight = 100; // Move items right by 100px
  const itemPositionLeft = 0; // Keep items aligned left
  const gapBetweenImages = 100; // Increased gap between images
  const tickSignMargin = 20; // Adjust margin for tickSign

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'5%'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px', // Gap of 200px between image and column
        }}
      >
        <div
        style={{
          display:'flex',
          flexDirection : "column",
          alignItems:'center',
          justifyContent:'flex-start'
        }}
        >
          <img src={bighelmet} style={{objectFit:'fill',height:'50%',width:'50%'}}/>
          <h4 >Employee</h4>
          <hr></hr>
          <div style={{flexDirection : 'column'}}>
          <h4>Name : Abhishek Deshapande</h4>
          <h4>Department : IT</h4>
          <h4>Report Manager : Shreeshail Sir</h4>
          </div>

        </div>
        <img
          src={image123}
          alt=""
          style={{
           
            maxWidth: `${20}%`,
            maxHeight: '100%',
            height : '80%',
            marginLeft: `${5}%`, // Move image123 right
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            marginLeft: `${gapBetweenImages}px`, // Increase gap between images
          }}
        >
          <div style={{ position: 'relative' }}>
            <img
              src={saftyHat}
              alt="Safety Hat"
              style={{ maxWidth: '800px', marginBottom: '7%', marginRight: `${itemPositionLeft}px` }} // Keep saftyHat aligned left
            />
            <img
              src={helmet}
              alt="Helmet"
              style={{ maxWidth: '100px', marginBottom: '7%', marginLeft: `${itemPositionRight}px` }} // Move helmet right
            />
            {/* Adding tickSign image next to helmet */}
            <img
              src={tickSign}
              alt="Tick Sign"
              style={{ maxWidth: '100px', position: 'absolute', top: '0', right: `${-1 * (tickSignMargin + 100)}px` }} // Adjust position
            />
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src={safetyJacket}
              alt="Safety Jacket"
              style={{ maxWidth: '800px', marginBottom: '7%', marginRight: `${itemPositionLeft}px` }} // Keep saftyJacket aligned left
            />
            <img
              src={jacket}
              alt="Jacket"
              style={{ maxWidth: '100px', marginBottom: '7%', marginLeft: `${itemPositionRight}px` }} // Move jacket right
            />
            {/* Adding tickSign image next to jacket */}
            <img
              src={tickSign}
              alt="Tick Sign"
              style={{ maxWidth: '100px', position: 'absolute', top: '0', right: `${-1 * (tickSignMargin + 100)}px` }} // Adjust position
            />
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src={safetyGloves}
              alt="Safety Gloves"
              style={{ maxWidth: '800px', marginBottom: '7%', marginRight: `${itemPositionLeft}px` }} // Keep saftyGloves aligned left
            />
            <img
              src={gloves}
              alt="Gloves"
              style={{ maxWidth: '100px', marginBottom: '7%', marginLeft: `${itemPositionRight}px` }} // Move gloves right
            />
            {/* Adding wrongSign image next to gloves */}
            <img
              src={wrongSign}
              alt="Wrong Sign"
              style={{ maxWidth: '100px', position: 'absolute', top: '0', right: `${-1 * (tickSignMargin + 100)}px` }} // Adjust position
            />
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <img
              src={safetyBoots}
              alt="Safety Boots"
              style={{ maxWidth: '800px', marginRight: `${itemPositionLeft}px` }} // Keep saftyBoots aligned left
            />
            <img
              src={shoes}
              alt="Shoes"
              style={{ maxWidth: '100px', marginLeft: `${itemPositionRight}px` }} // Move shoes right
            />
            {/* Adding tickSign image next to shoes */}
            <img
              src={tickSign}
              alt="Tick Sign"
              style={{ maxWidth: '100px', position: 'absolute', top: '0', right: `${-1 * (tickSignMargin + 100)}px` }} // Adjust position
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;









