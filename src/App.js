import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AboutPage from './AboutPage'; // Create this component
import ContactPage from './ContactPage'; // Create this component
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-105.2398);
    const [lat, setLat] = useState(39.7230);
    const [zoom, setZoom] = useState(10.25);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Trail Finder
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                        <Typography variant="subtitle1" component="div">
                            Lon: {lng} | Lat: {lat} | Zoom: {zoom}
                        </Typography>
                    </Box>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/about">About</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/" element={<div ref={mapContainer} className="map-container" />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </Router>
    );
}
