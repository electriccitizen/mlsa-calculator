import React from 'react';
import 'react-tippy/dist/tippy.css';
import { Tooltip, } from 'react-tippy';
import { Button, Box, ButtonGroup } from '@chakra-ui/react'

class Escape extends React.Component {

  constructor(props) {
    super(props);
    if (typeof document !== `undefined`) {
        var storedValue = sessionStorage.getItem('quick_exit');
        // if (cookie){
        if (storedValue){
            window.history.forward();
        }
        // check for session cookie
      if (document.cookie.split(';').filter((item) => item.trim().startsWith('new=')).length) {
        this.trigger = false
      } else {
        this.trigger = true
      }
    } else {
      this.trigger = false
    }
      // set the initial state for tooltip
      this.state = {
        open: this.trigger,
      }
      this.setIsOpen = this.setIsOpen.bind(this)
    if (typeof document !== `undefined`) {
      // set a session cookie for new users
      document.cookie = "new=1";
    }
  }

  setIsOpen = (option) => {
    this.setState({
      open: option
    });
  }

  handleClick = () => {
    if (typeof window !== `undefined`) {
        window.open('http://weather.com/','_newtab');
        window.location.href = 'http://google.com';
        sessionStorage.setItem('quick_exit', 'clicked');
    }
  }

  render() {
    return (
        <Tooltip
          // options
          title="Safe Browsing"
          animation="perspective"
          hideDelay="3000"
          duration="1000"
          position="bottom"
          distance="30"
          arrow="true"
          interactive="true"
          theme="light"
          // className="md:order-2"
          open={this.state.open}
          html={(
            <div>
              <Box pb={8}> Click the Quick Exit button to quickly exit this site. For more Internet safety information, click the Learn more button to visit our Safety Tips Page.</Box>

              <ButtonGroup colorScheme='teal' spacing='6'>
              <Box
                  onClick={() => {this.setIsOpen(false)}}
                  as='button'
                  height='32px'
                  lineHeight='1.2'
                  transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                  border='1px'
                  px='8px'
                  borderRadius='2px'
                  fontSize='14px'
                  fontWeight='semibold'
                  bg='#14662e'
                  borderColor='#ccd0d5'
                  color='#fff'
                  _hover={{ bg: '#ebedf0', color: '#4b4f56' }}
                  _active={{
                    bg: '#dddfe2',
                    transform: 'scale(0.98)',
                    borderColor: '#bec3c9',
                  }}
                  _focus={{
                    boxShadow:
                        '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  }}
              >
               Got it
              </Box>
                <Box
                    onClick={() => window.location.href='/safety'}
                    as='button'
                    height='32px'
                    lineHeight='1.2'
                    transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                    border='1px'
                    px='8px'
                    borderRadius='2px'
                    fontSize='14px'
                    fontWeight='semibold'
                    bg='#f5f6f7'
                    borderColor='#ccd0d5'
                    color='#4b4f56'
                    _hover={{ bg: '#ebedf0' }}
                    _active={{
                        bg: '#14662e',
                        transform: 'scale(0.98)',
                        borderColor: '#bec3c9',
                    }}
                    _focus={{
                        boxShadow:
                            '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                    }}
                    >
                  Learn more
                </Box>
              </ButtonGroup>
            </div>
          )}
        >
          <Button
            onClick={this.handleClick}
            background='brand.500' color="white" size='sm'
            _hover={{ background: "brand.600", color: "gray.200" }}
          >
            Quick Exit
          </Button>
        </Tooltip>
    );
  }
}

export default Escape
