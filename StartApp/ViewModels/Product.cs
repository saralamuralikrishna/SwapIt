using System;
using System.Collections.Generic;

namespace StartApp.ViewModels
{
    /// <summary>
    /// Type of the product like Gloves, 
    /// </summary>
    [Serializable]
    public class ProductType
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    [Serializable]
    public class ProductCondition
    {
        public int Id { get; set; }
        public string Condition { get; set; }
    }

    [Serializable]
    public enum CountrySize
    {
        EU,
        UK,
        US,
        Asia
    }

    public class ProductSubType
    {
        //Id of the sub product type
        public int Id { get; set; }
        //Sports, Formals, Semi Formals, Flipflops
        public String SubType { get; set; }

        public ProductType ProductType { get; set; }
    }

    [Serializable]
    public class Product
    {
        //ID of the product
        public int Id { get; set; }
        //Shoes or Gloves
        public ProductType ProductType { get; set; }

        public ProductSubType ProductSemiType { get; set; }
        //size of the prduct always stored in EU
        public float Size { get; set; } 
        public string Category { get; set; } 
        //price of the product
        public float Price { get; set; }
        //Currency of the price
        public string Currency { get; set; }
        //Description of the product
        public string Description { get; set; }
        //Right or Left
        public RightLeft RightLeft { get; set; }
        //Male, Female, Boy, Girl
        public Gender Gender { get; set; } 
    }


    public class ProductImages
    {
        public int Id { get; set; }
        public Product Product { get; set; }
        public string ImageName { get; set; }
    }



    [Serializable]
    public enum RightLeft
    {
        RightLeg,
        LeftLeg
    }

    [Serializable]
    public enum Gender
    {
        Male,
        Female,
        Boy,
        Girl
    }

}