import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Footer } from 'flowbite-react';

const ComponentFooter = observer(() => {
    return (
        <>
        <Footer container className='w-12/12 mb-4 "flex justify-center mt-3'>
        <Footer.Copyright href="https://vk.com/shagren_leather" by="SHAGREN" year={Number(new Date().getFullYear())} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
        </>
    );
});

export default hot(ComponentFooter);
