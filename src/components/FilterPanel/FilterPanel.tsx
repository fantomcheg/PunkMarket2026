import React, { useState, useEffect } from 'react';
import styles from './FilterPanel.module.css';
import { getBrands, getPriceRange } from '@/data/products';

interface FilterPanelProps {
  categoryId: number;
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  brands: string[];
  priceMin: number;
  priceMax: number;
  rating: number;
  inStock: boolean;
  hasDiscount: boolean;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
  search?: string;
  seller?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ categoryId, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyWithDiscount, setOnlyWithDiscount] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSeller, setSelectedSeller] = useState<string>('');

  useEffect(() => {
    const categoryBrands = getBrands(categoryId);
    setBrands(categoryBrands);
    
    const [min, max] = getPriceRange(categoryId);
    setPriceRange([min, max]);
    setMinPrice(min);
    setMaxPrice(max);
  }, [categoryId]);

  useEffect(() => {
    onFilterChange({
      brands: selectedBrands,
      priceMin: minPrice,
      priceMax: maxPrice,
      rating: minRating,
      inStock: onlyInStock,
      hasDiscount: onlyWithDiscount,
      sortBy: 'popular',
      search: searchQuery,
      seller: selectedSeller,
    });
  }, [selectedBrands, minPrice, maxPrice, minRating, onlyInStock, onlyWithDiscount, searchQuery, selectedSeller, onFilterChange]);

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
    setMinRating(0);
    setOnlyInStock(false);
    setOnlyWithDiscount(false);
    setSearchQuery('');
    setSelectedSeller('');
  };

  return (
    <aside className={styles.filterPanel} data-xray-id="filter_panel">
      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>Фильтры</h3>
        <button 
          className={styles.resetButton} 
          onClick={resetFilters}
          data-xray-id="filter_reset"
        >
          Сбросить
        </button>
      </div>

      <div className={styles.filterBlock}>
        <h4 className={styles.filterSubtitle}>Поиск в категории</h4>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Введите название товара..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-xray-id="search_input"
        />
      </div>

      {brands.length > 0 && (
        <div className={styles.filterBlock}>
          <h4 className={styles.filterSubtitle}>Бренд</h4>
          <div className={styles.brandList}>
            {brands.map((brand) => (
              <label 
                key={brand} 
                className={styles.checkboxLabel}
                data-xray-id={`brand_${brand.toLowerCase().replace(/\s/g, '_')}`}
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className={styles.checkbox}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className={styles.filterBlock}>
        <h4 className={styles.filterSubtitle}>Цена</h4>
        <div className={styles.priceInputs}>
          <input
            type="number"
            placeholder="От"
            className={styles.priceInput}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            min={priceRange[0]}
            max={priceRange[1]}
            data-xray-id="price_min"
          />
          <span>—</span>
          <input
            type="number"
            placeholder="До"
            className={styles.priceInput}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            min={priceRange[0]}
            max={priceRange[1]}
            data-xray-id="price_max"
          />
        </div>
        <div className={styles.priceRange}>
          <input
            type="range"
            min={priceRange[0]}
            max={priceRange[1]}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className={styles.rangeSlider}
            data-xray-id="price_slider"
          />
        </div>
      </div>

      <div className={styles.filterBlock}>
        <h4 className={styles.filterSubtitle}>Рейтинг</h4>
        {[4.5, 4.0, 3.5].map((rating) => (
          <label key={rating} className={styles.checkboxLabel}>
            <input
              type="radio"
              name="rating"
              checked={minRating === rating}
              onChange={() => setMinRating(rating)}
              className={styles.radio}
              data-xray-id={`rating_${rating.toString().replace('.', '_')}`}
            />
            <span>От {rating} ⭐</span>
          </label>
        ))}
      </div>

      <div className={styles.filterBlock}>
        <h4 className={styles.filterSubtitle}>Дополнительно</h4>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className={styles.checkbox}
            data-xray-id="filter_in_stock"
          />
          <span>Только в наличии</span>
        </label>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={onlyWithDiscount}
            onChange={(e) => setOnlyWithDiscount(e.target.checked)}
            className={styles.checkbox}
            data-xray-id="filter_discount"
          />
          <span>Со скидкой</span>
        </label>
      </div>

      <div className={styles.filterBlock}>
        <h4 className={styles.filterSubtitle}>Продавец</h4>
        <select
          className={styles.select}
          value={selectedSeller}
          onChange={(e) => setSelectedSeller(e.target.value)}
          data-xray-id="seller_select"
        >
          <option value="">Все продавцы</option>
          <option value="1">OmniMarket</option>
          <option value="2">TechStore</option>
          <option value="3">ElectroPlus</option>
          <option value="4">GadgetHub</option>
        </select>
      </div>

      <div className={styles.filterInfo}>
        <p className={styles.infoText}>
          Активных фильтров: {selectedBrands.length + (onlyInStock ? 1 : 0) + (onlyWithDiscount ? 1 : 0) + (minRating > 0 ? 1 : 0)}
        </p>
      </div>
    </aside>
  );
};

export default FilterPanel;
