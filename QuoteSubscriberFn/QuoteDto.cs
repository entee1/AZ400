namespace QuoteSubscriberFn
{
    public class QuoteDto
    {
        public string Email { get; set; } = null!;
        public decimal PropertyValue { get; set; }
        public int YearBuilt { get; set; }
        public string ConstructionType { get; set; } = null!;
    }
}
