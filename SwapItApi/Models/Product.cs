using System;
using System.ComponentModel.DataAnnotations;

namespace SwapItApi.Models
{
    public class ProductType
    {
        [Required]
        public int ProductTypeId { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string ProductTypeName { get; set; }
        public int SortOrder { get; set; }
    }

    public class ProductSubType
    {
        [Required]
        public int ProductSubTypeId { get; set; }
        [MinLength(1)]
        [MaxLength(100)]
        public string ProductSubTypeName { get; set; }
        public ProductType ProductType { get; set; }
        public int SortOrder { get; set; }
    }

    public class ProductCondition
    {
        [Required]
        public int ProductConditionId { get; set; }
        [MinLength(1)]
        [MaxLength(100)]
        public string ProductConditionName { get; set; }
        public int SortOrder { get; set; }
    }

    public class Item
    {
        [Required]
        public int ItemId { get; set; }
        public ProductType ProductType { get; set; }
        [MinLength(1)]
        [MaxLength(120)]
        public string BrandName { get; set; }
        public ProductSubType ProductSubType { get; set; }
        public ProductCondition ProductCondition { get; set; }
        public double Price { get; set; }
        [MaxLength(10)]
        public string Color { get; set; }
        public DateTime ItemPostedOn { get; set; }
        public DateTime ItemSoldOn { get; set; }
        [MaxLength(128)]
        public string ItemAddedBy { get; set; }
    }

    public class Image
    {
        public int ImageId { get; set; }
        [MaxLength(500)]
        public string ImageDisplayName { get; set; }
        [MaxLength(500)]
        public string ImageStoredByName { get; set; }
        public Item Item { get; set; }
    }
}