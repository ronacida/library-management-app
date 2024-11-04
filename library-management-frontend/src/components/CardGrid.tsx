import React from 'react';
import { Paper, Box, Typography, Alert, Card, CardContent, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { UserDTO } from '@/interfaces/User';
import { BookDTO } from '@/interfaces/Book';

type CardGridItem = UserDTO | BookDTO;

interface CardGridProps<T extends CardGridItem> {
  items: T[];
  title: string;
  linkPath: (item: T) => string;
  renderItemContent: (item: T) => React.ReactNode;
  error?: string | null;
}

const CardGrid = <T extends CardGridItem>({ items, title, linkPath, renderItemContent, error }: CardGridProps<T>) => {
  return (
    <Paper elevation={3} className="p-6 shadow-lg rounded-lg">
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      <Typography variant="h4" gutterBottom className="text-center text-cyan-700 text-2xl font-semibold mb-4">
        {title}
      </Typography>
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-start">
              {renderItemContent(item)}
              <IconButton component={Link} to={linkPath(item)} color="primary" className="self-end">
                <FaEye className="text-green-500" />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  );
};

export default CardGrid;
