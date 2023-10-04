import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const openWind = (url) => {
        window.open(
            `${url}`,
            "targetWindow",
            `toolbar=no,
            location=no,
            status=no,
            menubar=no,
            scrollbars=yes,
            resizable=yes,
            width=auto,
            height=auto`
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Problemas" {...a11yProps(0)} />
                    <Tab label="Preguntas" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Box>
                    <Button disabled={false}
                        size="small"
                        variant="large"
                        onClick={() => {
                            openWind('https://discord.com/channels/1101581994355347526/1104192484852121640')
                        }}
                        style={{
                            backgroundColor: 'rgb(4, 13, 18)',
                            color: 'white',
                            fontSize: '12px',
                            width: '150px',
                            height: '50px',
                        }}> Problamas </Button>
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Box>
                    <Button disabled={false}
                        size="small"
                        variant="large"
                        onClick={() => {
                            openWind('https://discord.com/channels/1101581994355347526/1104190496705875999')
                        }}
                        style={{
                            backgroundColor: 'rgb(4, 13, 18)',
                            color: 'white',
                            fontSize: '12px',
                            width: '150px',
                            height: '50px',
                        }}> Preguntas </Button>
                </Box>
            </CustomTabPanel>
        </Box>
    );
}