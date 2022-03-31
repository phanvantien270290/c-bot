/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/', { replace: true })
    }
    const goBack = () => {
        navigate(-1)
    }
    return (
        <div>
            <h1>
                <code>404</code>
                <div><span>UH OH! You're lost.</span></div>
            </h1>
            <Button onClick={goBack} color="primary">Back</Button>
            <Button onClick={goHome} color="primary">Home</Button>
        </div>
    );
}
export default NotFoundPage