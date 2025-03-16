"use client";

import React from 'react';
import Block from './Block';

const Navbar = () => {
    const blocks = [
        { position: [-1.5, 0, 0.1], dimensions: [2.7, 2.7, 1.2], color: 'green' },
        { position: [1, 0.5, 0.05], dimensions: [1.7, 1.7, 1.1], color: 'blue' },
        { position: [1, -1, 0], dimensions: [1.7, 0.7, 1], color: 'purple' },
    ];

    return (
        <group>
            {blocks.map((block, index) => (
                <Block 
                    key={index} 
                    position={block.position} 
                    dimensions={block.dimensions} 
                    color={block.color} 
                />
            ))}
        </group>
    );
};

export default Navbar;