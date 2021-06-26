import React from 'react'

export function formatDate(date) {
    return date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1");
  }
